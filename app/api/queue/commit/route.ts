// app/api/queue/commit/route.ts
import { NextResponse } from "next/server";
import { fenDb } from "@/lib/memoryDb";
import { z } from "zod";

const Body = z.object({
  eventId: z.string().min(1),
  tierId: z.string().min(1),
  wallet: z.string().min(5),
  stakeXrp: z.string().min(1),
  commitHash: z.string().min(10),
  commitTxHash: z.string().min(10), // real tx hash
});

export async function POST(req: Request) {
  const json = await req.json();
  const body = Body.parse(json);

  const existing = fenDb.queue.find(
    (q) => q.eventId === body.eventId && q.tierId === body.tierId && q.wallet === body.wallet
  );
  if (existing) {
    return NextResponse.json({ ok: false, error: "Already committed for this event/tier" }, { status: 400 });
  }

  fenDb.queue.push({
    eventId: body.eventId,
    tierId: body.tierId,
    wallet: body.wallet,
    stakeXrp: body.stakeXrp,
    commitHash: body.commitHash,
    commitTxHash: body.commitTxHash,
    createdAt: Date.now(),
  });

  return NextResponse.json({ ok: true });
}
