// app/api/tickets/my/route.ts
import { NextResponse } from "next/server";
import { fenDb } from "@/lib/memoryDb";

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const wallet = searchParams.get("wallet");

    if (!wallet) {
        return NextResponse.json({ ok: false, error: "Missing wallet" }, { status: 400 });
    }

    const tickets = fenDb.queue.filter(
        (q) => q.wallet === wallet && q.status === "claimed"
    );

    return NextResponse.json({ tickets });
}
