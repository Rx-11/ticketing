// app/api/score/route.ts
import { NextResponse } from "next/server";
import { fenDb } from "@/lib/db";

function mockScore(wallet: string): number {
  // MVP: hardcode 2 wallets by suffix/pattern or just return 0 if unknown.
  // Replace these with your real addresses for the demo.
  const w = wallet?.trim();
  if (!w) return 0;

  // Example: if wallet ends with "A" treat as high-score (demo-only)
  if (w.endsWith("A")) return 80;

  return 0;
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const wallet = searchParams.get("wallet") || "";

  if (!wallet.trim()) {
    return NextResponse.json({ wallet: "", score: 0 });
  }

  const score = fenDb.scores.get(wallet.trim());
  return NextResponse.json({ wallet, score });
}
