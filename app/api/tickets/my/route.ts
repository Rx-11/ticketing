import { NextResponse } from "next/server";
import { fenDb } from "@/lib/db";

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const wallet = searchParams.get("wallet");

    if (!wallet) {
        return NextResponse.json({ ok: false, error: "Missing wallet" }, { status: 400 });
    }

    const tickets = fenDb.queue.getAll().filter(
        (q: any) => q.wallet === wallet && q.status === "claimed"
    );

    return NextResponse.json({ tickets });
}

