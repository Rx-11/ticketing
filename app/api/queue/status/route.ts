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

    const entriesForTier = fenDb.queue.getAll()
        .filter((q: any) => q.eventId === eventId && q.tierId === tierId);

    const activeWaiters = entriesForTier.filter((q: any) => q.status === "committed");

    // Get ALL entries for this wallet (multiple tickets)
    const myEntries = entriesForTier.filter((q: any) => q.wallet === wallet);

    // Latest entry for backward compatibility
    const latestEntry = myEntries.length > 0 ? myEntries[myEntries.length - 1] : null;

    // Find the latest committed one (if any)
    const latestCommitted = [...myEntries].reverse().find((q: any) => q.status === "committed");

    // Overall status: if any are committed, show committed. If all claimed, show claimed.
    let overallStatus = "not_found";
    if (latestCommitted) {
        overallStatus = "committed";
    } else if (myEntries.length > 0) {
        overallStatus = myEntries.every((q: any) => q.status === "claimed") ? "claimed" : myEntries[myEntries.length - 1].status;
    }

    const absIndex = latestCommitted
        ? entriesForTier.findIndex((q: any) => q.id === latestCommitted.id)
        : -1;
    const waitingIndex = latestCommitted
        ? activeWaiters.findIndex((q: any) => q.id === latestCommitted.id)
        : -1;

    return NextResponse.json({
        status: overallStatus,
        absolutePosition: absIndex !== -1 ? absIndex + 1 : -1,
        waitingPosition: waitingIndex !== -1 ? waitingIndex + 1 : -1,
        total: entriesForTier.length,
        totalWaiting: activeWaiters.length,
        entry: latestCommitted || latestEntry,
        myEntries,
        queueList: entriesForTier.map((q: any) => ({
            wallet: q.wallet,
            commitTxHash: q.commitTxHash,
            createdAt: q.createdAt,
            status: q.status
        }))
    });
}

