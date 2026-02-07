// lib/events.ts

export type Split = {
  name: "artist" | "venue" | "platform";
  address: string;          // XRPL classic address
  bps: number;              // basis points, must sum to 10000
};

export type Tier = {
  tierId: string;
  name: string;
  priceXrp: string;         // use string to avoid float issues, e.g. "50"
  supply: number;
  resaleCapBps: number;     // e.g. 1000 = +10%
};

export type EventConfig = {
  eventId: string;
  name: string;
  venueName: string;
  startTimeISO: string;     // ISO timestamp
  currency: "XRP";
  tiers: Tier[];
  primarySplits: Split[];   // applied to primary sale
  resaleSplits: Split[];    // applied on resale (fees/royalty); seller gets the rest
  rules: {
    commitWindowSeconds: number;
    revealWindowSeconds: number;
    resaleCloseHoursBeforeStart: number;
  };
};

// NOTE: Replace addresses with your real Testnet addresses later.
// For now, use placeholders or your platform wallet for all three.
export const EVENTS: EventConfig[] = [
  {
    eventId: "EVT-ROCK-001",
    name: "Fen Live: Stadium Rock Night",
    venueName: "Fen Arena",
    startTimeISO: new Date(Date.now() + 7 * 24 * 3600 * 1000).toISOString(),
    currency: "XRP",
    tiers: [
      { tierId: "GA", name: "General Admission", priceXrp: "50", supply: 2, resaleCapBps: 1000 },
    ],
    primarySplits: [
      { name: "artist", address: "rARTIST_REPLACE_ME", bps: 7000 },
      { name: "venue", address: "rVENUE_REPLACE_ME", bps: 2000 },
      { name: "platform", address: "rPLATFORM_REPLACE_ME", bps: 1000 },
    ],
    // On resale: these are fees/royalties taken from the resale price.
    // Seller receives (10000 - sum(resaleSplits)) bps.
    resaleSplits: [
      { name: "artist", address: "rARTIST_REPLACE_ME", bps: 300 },   // 3%
      { name: "platform", address: "rPLATFORM_REPLACE_ME", bps: 200 },// 2%
      { name: "venue", address: "rVENUE_REPLACE_ME", bps: 100 },     // 1%
    ],
    rules: {
      commitWindowSeconds: 60,
      revealWindowSeconds: 60,
      resaleCloseHoursBeforeStart: 6,
    },
  },
  {
    eventId: "EVT-EDM-002",
    name: "Fen Rave: Neon Pulse",
    venueName: "Warehouse District",
    startTimeISO: new Date(Date.now() + 14 * 24 * 3600 * 1000).toISOString(),
    currency: "XRP",
    tiers: [
      { tierId: "GA", name: "General Admission", priceXrp: "60", supply: 2, resaleCapBps: 1000 },
    ],
    primarySplits: [
      { name: "artist", address: "rARTIST_REPLACE_ME", bps: 6500 },
      { name: "venue", address: "rVENUE_REPLACE_ME", bps: 2500 },
      { name: "platform", address: "rPLATFORM_REPLACE_ME", bps: 1000 },
    ],
    resaleSplits: [
      { name: "artist", address: "rARTIST_REPLACE_ME", bps: 300 },
      { name: "platform", address: "rPLATFORM_REPLACE_ME", bps: 200 },
      { name: "venue", address: "rVENUE_REPLACE_ME", bps: 100 },
    ],
    rules: {
      commitWindowSeconds: 60,
      revealWindowSeconds: 60,
      resaleCloseHoursBeforeStart: 6,
    },
  },
];

export function getEvent(eventId: string): EventConfig {
  const normalized = (eventId ?? "").trim();

  const evt = EVENTS.find(e => e.eventId.trim() === normalized);

  if (!evt) {
    // Helpful debug in terminal:
    console.error("[getEvent] Unknown eventId:", normalized);
    console.error("[getEvent] Known eventIds:", EVENTS.map(e => e.eventId));
    throw new Error(`Unknown eventId: ${normalized}`);
  }

  return evt;
}

export function getTier(eventId: string, tierId: string): Tier {
  const evt = getEvent(eventId);
  const tier = evt.tiers.find(t => t.tierId === tierId);
  if (!tier) throw new Error(`Unknown tierId: ${tierId} for eventId: ${eventId}`);
  return tier;
}
