// app/api/queue/status/route.ts
import { NextResponse } from "next/server";
import { fenDb } from "@/lib/memoryDb";

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const eventId = searchParams.get("eventId");
    const tierId = searchParams.get("tierId");
    const wallet = searchParams.get("wallet");

    if (!eventId || !tierId || !wallet) {
        return NextResponse.json({ ok: false, error: "Missing params" }, { status: 400 });
    }

    const entriesForTier = fenDb.queue
        .filter((q) => q.eventId === eventId && q.tierId === tierId)
        .sort((a, b) => a.createdAt - b.createdAt);

    const index = entriesForTier.findIndex((q) => q.wallet === wallet);
    const entry = entriesForTier[index];

    if (index === -1) {
        return NextResponse.json({ status: "not_found" });
    }

    return NextResponse.json({
        status: entry.status,
        position: index + 1,
        total: entriesForTier.length,
        entry,
    });
}
