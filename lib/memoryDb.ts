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

  status: "committed" | "revealed" | "claimed";
  nftId?: string;
};

const g = globalThis as any;
if (!g.__fenDb) {
  g.__fenDb = {
    queue: [] as QueueEntry[],
    offers: [] as { offerId: string, nftId: string, seller: string, priceXrp: string, eventId: string, tierId: string }[]
  };
}
export const fenDb: {
  queue: QueueEntry[],
  offers: { offerId: string, nftId: string, seller: string, priceXrp: string, eventId: string, tierId: string }[]
} = g.__fenDb;
