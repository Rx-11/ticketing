// lib/stake.ts
export function requiredStakeXrp(score: number): string {
  // Simple, obvious curve for demo:
  // score 0 => 25 XRP
  // score 80 => ~5 XRP
  const maxStake = 2.5;
  const minStake = 0.5;

  const clamped = Math.max(0, Math.min(100, score));
  const t = clamped / 100; // 0..1
  const stake = maxStake - (maxStake - minStake) * t;

  // keep nice formatting
  return stake.toFixed(2).replace(/\.?0+$/, "");
}
