// app/api/queue/reveal/route.ts
import { NextResponse } from "next/server";
import { fenDb } from "@/lib/memoryDb";
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

        // 0) Get price
        const tier = getTier(body.eventId, body.tierId);
        const priceXrp = tier.priceXrp;

        // 1) Find the commitment
        const entry = fenDb.queue.find(
            (q) =>
                q.eventId === body.eventId &&
                q.tierId === body.tierId &&
                q.wallet === body.wallet &&
                q.status === "committed"
        );

        if (!entry) {
            return NextResponse.json({ ok: false, error: "Commitment not found or already revealed" }, { status: 404 });
        }

        // 2) Verify the hash
        const input = `${body.eventId}|${body.tierId}|${body.wallet}|${body.secret}|${body.nonce}`;
        const calculatedHash = await sha256Hex(input);

        if (calculatedHash !== entry.commitHash) {
            return NextResponse.json({ ok: false, error: "Invalid secret or nonce" }, { status: 400 });
        }

        // 3) Process Reveal, Refund and Mint
        console.log(`[Reveal] Refunding ${entry.stakeXrp} XRP to ${body.wallet}...`);
        const refundResult = await refundStake(body.wallet, entry.stakeXrp);

        console.log(`[Reveal] Minting NFT ticket for ${body.wallet}...`);
        const mintResult = await mintTicketNFT(body.wallet, body.eventId, body.tierId);

        console.log(`[Reveal] Creating ${priceXrp} XRP sell offer for NFT ${mintResult.nftID} to ${body.wallet}...`);
        const offerResult = await createNftSellOffer(body.wallet, mintResult.nftID, priceXrp);

        // 4) Update DB
        entry.status = "claimed";
        entry.revealSecret = body.secret;
        entry.revealNonce = body.nonce;
        entry.revealTxHash = refundResult.hash;
        entry.nftId = mintResult.nftID;
        (entry as any).offerTxHash = offerResult.hash;

        return NextResponse.json({
            ok: true,
            refundTxHash: entry.revealTxHash,
            mintTxHash: mintResult.hash,
            nftId: entry.nftId,
            offerTxHash: (entry as any).offerTxHash
        });


    } catch (error: any) {
        console.error("[Reveal Error]", error);
        return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
    }
}
