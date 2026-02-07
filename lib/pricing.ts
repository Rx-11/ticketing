// lib/pricing.ts

// basis points math, everything in strings/ints
export function maxResalePriceXrp(faceValueXrp: string, resaleCapBps: number): string {
  // max = face * (1 + capBps/10000)
  // Work in “drops” (1 XRP = 1,000,000 drops) to avoid float.
  const faceDrops = BigInt(Math.round(Number(faceValueXrp) * 1_000_000));
  const maxDrops = (faceDrops * BigInt(10_000 + resaleCapBps)) / BigInt(10_000);
  return (Number(maxDrops) / 1_000_000).toFixed(6).replace(/\.?0+$/, "");
}
