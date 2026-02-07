import { NextResponse } from "next/server";
import { fenDb } from "@/lib/db";
import { getTier } from "@/lib/events";
import { maxResalePriceXrp } from "@/lib/pricing";
import { z } from "zod";

const Body = z.object({
    offerId: z.string(),
    nftId: z.string(),
    seller: z.string(),
    priceXrp: z.string(),
    eventId: z.string(),
    tierId: z.string(),
    offerIndex: z.string().optional(),
});

export async function POST(req: Request) {
    try {
        const json = await req.json();
        const body = Body.parse(json);

        const tier = getTier(body.eventId, body.tierId);
        const maxPrice = maxResalePriceXrp(tier.priceXrp, tier.resaleCapBps);

        if (Number(body.priceXrp) > Number(maxPrice)) {
            return NextResponse.json({
                ok: false,
                error: `Price exceeds ceiling! Max allowed: ${maxPrice} XRP`
            }, { status: 400 });
        }

        fenDb.offers.push(body);

        // Decrease trust score on resale (-5)
        const newScore = fenDb.scores.increment(body.seller, -5);
        console.log(`[Score] ${body.seller} score decreased to ${newScore} (resale)`);

        return NextResponse.json({ ok: true, newScore });
    } catch (error: any) {
        return NextResponse.json({ ok: false, error: error.message }, { status: 400 });
    }
}

export async function GET() {
    return NextResponse.json({ offers: fenDb.offers.getAll() });
}

