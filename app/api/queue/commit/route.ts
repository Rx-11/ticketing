import { NextResponse } from "next/server";
import { fenDb } from "@/lib/db";
import { z } from "zod";

const Body = z.object({
  eventId: z.string().min(1),
  tierId: z.string().min(1),
  wallet: z.string().min(5),
  stakeXrp: z.string().min(1),
  commitHash: z.string().min(10),
  commitTxHash: z.string().min(10),
  ticketIndex: z.number().int().min(0).default(0),
});

export async function POST(req: Request) {
  const json = await req.json();
  const body = Body.parse(json);

  // Check for duplicate commitHash (same exact commit), not duplicate wallet
  const duplicate = fenDb.queue.find(
    (q) => q.commitHash === body.commitHash
  );
  if (duplicate) {
    return NextResponse.json({ ok: false, error: "Duplicate commit hash" }, { status: 400 });
  }

  const id = fenDb.queue.push({
    eventId: body.eventId,
    tierId: body.tierId,
    wallet: body.wallet,
    stakeXrp: body.stakeXrp,
    commitHash: body.commitHash,
    commitTxHash: body.commitTxHash,
    createdAt: Date.now(),
    status: "committed",
  });

  return NextResponse.json({ ok: true, id });
}
