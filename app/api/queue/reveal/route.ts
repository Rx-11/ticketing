import { NextResponse } from "next/server";
import { fenDb } from "@/lib/db";
import { sha256Hex } from "@/lib/hash";
import { refundStake, mintTicketNFT, createNftSellOffer } from "@/lib/xrplSrv";
import { getTier } from "@/lib/events";
import { z } from "zod";

const Body = z.object({
    eventId: z.string(),
    tierId: z.string(),
    wallet: z.string(),
    secret: z.string(),
    nonce: z.string(),
});

export async function POST(req: Request) {
    try {
        const json = await req.json();
        const body = Body.parse(json);

        const tier = getTier(body.eventId, body.tierId);
        const priceXrp = tier.priceXrp;

        // Find the OLDEST committed entry for this wallet+event+tier
        const allCommitted = fenDb.queue.filter(
            (q: any) =>
                q.eventId === body.eventId &&
                q.tierId === body.tierId &&
                q.wallet === body.wallet &&
                q.status === "committed"
        );

        if (!allCommitted || allCommitted.length === 0) {
            return NextResponse.json({ ok: false, error: "Commitment not found or already revealed" }, { status: 404 });
        }

        // Take the oldest one
        const entry = allCommitted[0] as any;

        // Verify the hash
        const input = `${body.eventId}|${body.tierId}|${body.wallet}|${body.secret}|${body.nonce}`;
        const calculatedHash = await sha256Hex(input);

        if (calculatedHash !== entry.commitHash) {
            return NextResponse.json({ ok: false, error: "Invalid secret or nonce" }, { status: 400 });
        }

        // Process
        console.log(`[Reveal] Refunding ${entry.stakeXrp} XRP to ${body.wallet}...`);
        const refundResult = await refundStake(body.wallet, entry.stakeXrp);

        console.log(`[Reveal] Minting NFT ticket for ${body.wallet}...`);
        const mintResult = await mintTicketNFT(body.wallet, body.eventId, body.tierId);

        console.log(`[Reveal] Creating ${priceXrp} XRP sell offer for NFT ${mintResult.nftID} to ${body.wallet}...`);
        const offerResult = await createNftSellOffer(body.wallet, mintResult.nftID, priceXrp);

        // Update DB by ID (not wallet, so we don't overwrite other tickets)
        const updates = {
            status: "claimed",
            revealSecret: body.secret,
            revealNonce: body.nonce,
            revealTxHash: refundResult.hash,
            nftId: mintResult.nftID,
            offerTxHash: offerResult.hash
        };
        fenDb.queue.updateById(entry.id, updates);

        // Increase trust score on successful ticket purchase
        const newScore = fenDb.scores.increment(body.wallet, 10);
        console.log(`[Score] ${body.wallet} score increased to ${newScore}`);

        return NextResponse.json({
            ok: true,
            refundTxHash: updates.revealTxHash,
            mintTxHash: mintResult.hash,
            nftId: updates.nftId,
            offerTxHash: updates.offerTxHash,
            newScore,
        });

    } catch (error: any) {
        console.error("[Reveal Error]", error);
        return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
    }
}
