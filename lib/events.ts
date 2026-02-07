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
    name: "NFTickets Live: Stadium Rock Night",
    venueName: "NFTickets Arena",
    startTimeISO: new Date(Date.now() + 7 * 24 * 3600 * 1000).toISOString(),
    currency: "XRP",
    tiers: [
      { tierId: "GA", name: "General Admission", priceXrp: "1", supply: 2, resaleCapBps: 1000 },
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
    name: "NFTickets Rave: Neon Pulse",
    venueName: "Warehouse District",
    startTimeISO: new Date(Date.now() + 14 * 24 * 3600 * 1000).toISOString(),
    currency: "XRP",
    tiers: [
      { tierId: "GA", name: "General Admission", priceXrp: "1", supply: 2, resaleCapBps: 1000 },
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
  {
    eventId: "EVT-JAZZ-003",
    name: "Blue Note Sessions: Jazz Under the Stars",
    venueName: "Riverside Amphitheatre",
    startTimeISO: new Date(Date.now() + 10 * 24 * 3600 * 1000).toISOString(),
    currency: "XRP",
    tiers: [
      { tierId: "GA", name: "General Admission", priceXrp: "1", supply: 5, resaleCapBps: 800 },
      { tierId: "VIP", name: "Front Row VIP", priceXrp: "3", supply: 2, resaleCapBps: 500 },
    ],
    primarySplits: [
      { name: "artist", address: "rARTIST_REPLACE_ME", bps: 7500 },
      { name: "venue", address: "rVENUE_REPLACE_ME", bps: 1500 },
      { name: "platform", address: "rPLATFORM_REPLACE_ME", bps: 1000 },
    ],
    resaleSplits: [
      { name: "artist", address: "rARTIST_REPLACE_ME", bps: 400 },
      { name: "platform", address: "rPLATFORM_REPLACE_ME", bps: 150 },
      { name: "venue", address: "rVENUE_REPLACE_ME", bps: 50 },
    ],
    rules: {
      commitWindowSeconds: 90,
      revealWindowSeconds: 90,
      resaleCloseHoursBeforeStart: 4,
    },
  },
  {
    eventId: "EVT-COMEDY-004",
    name: "Stand-Up Showdown: Comedy Clash",
    venueName: "The Laugh Factory",
    startTimeISO: new Date(Date.now() + 5 * 24 * 3600 * 1000).toISOString(),
    currency: "XRP",
    tiers: [
      { tierId: "GA", name: "General Admission", priceXrp: "1", supply: 8, resaleCapBps: 1200 },
    ],
    primarySplits: [
      { name: "artist", address: "rARTIST_REPLACE_ME", bps: 6000 },
      { name: "venue", address: "rVENUE_REPLACE_ME", bps: 3000 },
      { name: "platform", address: "rPLATFORM_REPLACE_ME", bps: 1000 },
    ],
    resaleSplits: [
      { name: "artist", address: "rARTIST_REPLACE_ME", bps: 250 },
      { name: "platform", address: "rPLATFORM_REPLACE_ME", bps: 250 },
      { name: "venue", address: "rVENUE_REPLACE_ME", bps: 100 },
    ],
    rules: {
      commitWindowSeconds: 45,
      revealWindowSeconds: 45,
      resaleCloseHoursBeforeStart: 3,
    },
  },
  {
    eventId: "EVT-TECH-005",
    name: "Web3 Summit: Decentralized Future",
    venueName: "Convention Center Hall A",
    startTimeISO: new Date(Date.now() + 21 * 24 * 3600 * 1000).toISOString(),
    currency: "XRP",
    tiers: [
      { tierId: "GA", name: "General Pass", priceXrp: "2", supply: 10, resaleCapBps: 500 },
      { tierId: "VIP", name: "Speaker Dinner VIP", priceXrp: "5", supply: 3, resaleCapBps: 300 },
    ],
    primarySplits: [
      { name: "artist", address: "rARTIST_REPLACE_ME", bps: 5000 },
      { name: "venue", address: "rVENUE_REPLACE_ME", bps: 3500 },
      { name: "platform", address: "rPLATFORM_REPLACE_ME", bps: 1500 },
    ],
    resaleSplits: [
      { name: "artist", address: "rARTIST_REPLACE_ME", bps: 200 },
      { name: "platform", address: "rPLATFORM_REPLACE_ME", bps: 300 },
      { name: "venue", address: "rVENUE_REPLACE_ME", bps: 100 },
    ],
    rules: {
      commitWindowSeconds: 120,
      revealWindowSeconds: 120,
      resaleCloseHoursBeforeStart: 12,
    },
  },
  {
    eventId: "EVT-HIPHOP-006",
    name: "Cipher Night: Hip-Hop Takeover",
    venueName: "The Underground",
    startTimeISO: new Date(Date.now() + 3 * 24 * 3600 * 1000).toISOString(),
    currency: "XRP",
    tiers: [
      { tierId: "GA", name: "General Admission", priceXrp: "1", supply: 6, resaleCapBps: 1500 },
      { tierId: "VIP", name: "Backstage Pass", priceXrp: "4", supply: 2, resaleCapBps: 800 },
    ],
    primarySplits: [
      { name: "artist", address: "rARTIST_REPLACE_ME", bps: 8000 },
      { name: "venue", address: "rVENUE_REPLACE_ME", bps: 1000 },
      { name: "platform", address: "rPLATFORM_REPLACE_ME", bps: 1000 },
    ],
    resaleSplits: [
      { name: "artist", address: "rARTIST_REPLACE_ME", bps: 500 },
      { name: "platform", address: "rPLATFORM_REPLACE_ME", bps: 150 },
      { name: "venue", address: "rVENUE_REPLACE_ME", bps: 50 },
    ],
    rules: {
      commitWindowSeconds: 60,
      revealWindowSeconds: 60,
      resaleCloseHoursBeforeStart: 6,
    },
  },
  {
    eventId: "EVT-CLASSICAL-007",
    name: "Philharmonic Gala: Moonlight Sonata",
    venueName: "Grand Concert Hall",
    startTimeISO: new Date(Date.now() + 30 * 24 * 3600 * 1000).toISOString(),
    currency: "XRP",
    tiers: [
      { tierId: "GA", name: "Balcony Seating", priceXrp: "2", supply: 10, resaleCapBps: 600 },
      { tierId: "VIP", name: "Orchestra Front Row", priceXrp: "6", supply: 2, resaleCapBps: 400 },
    ],
    primarySplits: [
      { name: "artist", address: "rARTIST_REPLACE_ME", bps: 7000 },
      { name: "venue", address: "rVENUE_REPLACE_ME", bps: 2200 },
      { name: "platform", address: "rPLATFORM_REPLACE_ME", bps: 800 },
    ],
    resaleSplits: [
      { name: "artist", address: "rARTIST_REPLACE_ME", bps: 350 },
      { name: "platform", address: "rPLATFORM_REPLACE_ME", bps: 150 },
      { name: "venue", address: "rVENUE_REPLACE_ME", bps: 100 },
    ],
    rules: {
      commitWindowSeconds: 120,
      revealWindowSeconds: 120,
      resaleCloseHoursBeforeStart: 8,
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
