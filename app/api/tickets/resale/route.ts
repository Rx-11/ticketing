// app/api/tickets/resale/route.ts
import { NextResponse } from "next/server";
import { fenDb } from "@/lib/memoryDb";
import { z } from "zod";

const Body = z.object({
    offerId: z.string(),
    nftId: z.string(),
    seller: z.string(),
    priceXrp: z.string(),
    eventId: z.string(),
    tierId: z.string(),
});

export async function POST(req: Request) {
    try {
        const json = await req.json();
        const body = Body.parse(json);

        fenDb.offers.push(body);

        return NextResponse.json({ ok: true });
    } catch (error: any) {
        return NextResponse.json({ ok: false, error: error.message }, { status: 400 });
    }
}

export async function GET() {
    return NextResponse.json({ offers: fenDb.offers });
}
