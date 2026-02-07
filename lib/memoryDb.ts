// lib/memoryDb.ts
export type QueueEntry = {
  eventId: string;
  tierId: string;
  wallet: string;
  stakeXrp: string;

  commitHash: string;
  commitTxHash: string; // placeholder now, real XRPL later
  createdAt: number;

  revealSecret?: string;
  revealNonce?: string;
  revealTxHash?: string;
};

const g = globalThis as any;
if (!g.__fenDb) {
  g.__fenDb = { queue: [] as QueueEntry[] };
}
export const fenDb: { queue: QueueEntry[] } = g.__fenDb;
