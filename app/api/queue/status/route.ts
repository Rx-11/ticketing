import { NextResponse } from "next/server";
import { fenDb } from "@/lib/db";

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const eventId = searchParams.get("eventId");
    const tierId = searchParams.get("tierId");
    const wallet = searchParams.get("wallet");

    if (!eventId || !tierId || !wallet) {
        return NextResponse.json({ ok: false, error: "Missing params" }, { status: 400 });
    }

    // Get all entries for this tier to show the "live queue"
    const entriesForTier = fenDb.queue.getAll()
        .filter((q: any) => q.eventId === eventId && q.tierId === tierId);

    const activeWaiters = entriesForTier.filter((q: any) => q.status === "committed");

    const absIndex = entriesForTier.findIndex((q: any) => q.wallet === wallet);
    const waitingIndex = activeWaiters.findIndex((q: any) => q.wallet === wallet);

    const entry = absIndex !== -1 ? entriesForTier[absIndex] : null;

    return NextResponse.json({
        status: entry ? entry.status : "not_found",
        absolutePosition: absIndex !== -1 ? absIndex + 1 : -1,
        waitingPosition: waitingIndex !== -1 ? waitingIndex + 1 : -1,
        total: entriesForTier.length,
        totalWaiting: activeWaiters.length,
        entry,
        queueList: entriesForTier.map((q: any) => ({
            wallet: q.wallet,
            commitTxHash: q.commitTxHash,
            createdAt: q.createdAt,
            status: q.status
        }))
    });
}

