module.exports = [
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[project]/lib/events.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// lib/events.ts
__turbopack_context__.s([
    "EVENTS",
    ()=>EVENTS,
    "getEvent",
    ()=>getEvent,
    "getTier",
    ()=>getTier
]);
const EVENTS = [
    {
        eventId: "EVT-ROCK-001",
        name: "Fen Live: Stadium Rock Night",
        venueName: "Fen Arena",
        startTimeISO: new Date(Date.now() + 7 * 24 * 3600 * 1000).toISOString(),
        currency: "XRP",
        tiers: [
            {
                tierId: "GA",
                name: "General Admission",
                priceXrp: "50",
                supply: 2,
                resaleCapBps: 1000
            }
        ],
        primarySplits: [
            {
                name: "artist",
                address: "rARTIST_REPLACE_ME",
                bps: 7000
            },
            {
                name: "venue",
                address: "rVENUE_REPLACE_ME",
                bps: 2000
            },
            {
                name: "platform",
                address: "rPLATFORM_REPLACE_ME",
                bps: 1000
            }
        ],
        // On resale: these are fees/royalties taken from the resale price.
        // Seller receives (10000 - sum(resaleSplits)) bps.
        resaleSplits: [
            {
                name: "artist",
                address: "rARTIST_REPLACE_ME",
                bps: 300
            },
            {
                name: "platform",
                address: "rPLATFORM_REPLACE_ME",
                bps: 200
            },
            {
                name: "venue",
                address: "rVENUE_REPLACE_ME",
                bps: 100
            }
        ],
        rules: {
            commitWindowSeconds: 60,
            revealWindowSeconds: 60,
            resaleCloseHoursBeforeStart: 6
        }
    },
    {
        eventId: "EVT-EDM-002",
        name: "Fen Rave: Neon Pulse",
        venueName: "Warehouse District",
        startTimeISO: new Date(Date.now() + 14 * 24 * 3600 * 1000).toISOString(),
        currency: "XRP",
        tiers: [
            {
                tierId: "GA",
                name: "General Admission",
                priceXrp: "60",
                supply: 2,
                resaleCapBps: 1000
            }
        ],
        primarySplits: [
            {
                name: "artist",
                address: "rARTIST_REPLACE_ME",
                bps: 6500
            },
            {
                name: "venue",
                address: "rVENUE_REPLACE_ME",
                bps: 2500
            },
            {
                name: "platform",
                address: "rPLATFORM_REPLACE_ME",
                bps: 1000
            }
        ],
        resaleSplits: [
            {
                name: "artist",
                address: "rARTIST_REPLACE_ME",
                bps: 300
            },
            {
                name: "platform",
                address: "rPLATFORM_REPLACE_ME",
                bps: 200
            },
            {
                name: "venue",
                address: "rVENUE_REPLACE_ME",
                bps: 100
            }
        ],
        rules: {
            commitWindowSeconds: 60,
            revealWindowSeconds: 60,
            resaleCloseHoursBeforeStart: 6
        }
    }
];
function getEvent(eventId) {
    const evt = EVENTS.find((e)=>e.eventId === eventId);
    if (!evt) throw new Error(`Unknown eventId: ${eventId}`);
    return evt;
}
function getTier(eventId, tierId) {
    const evt = getEvent(eventId);
    const tier = evt.tiers.find((t)=>t.tierId === tierId);
    if (!tier) throw new Error(`Unknown tierId: ${tierId} for eventId: ${eventId}`);
    return tier;
}
}),
"[project]/lib/stake.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// lib/stake.ts
__turbopack_context__.s([
    "requiredStakeXrp",
    ()=>requiredStakeXrp
]);
function requiredStakeXrp(score) {
    // Simple, obvious curve for demo:
    // score 0 => 25 XRP
    // score 80 => ~5 XRP
    const maxStake = 25;
    const minStake = 5;
    const clamped = Math.max(0, Math.min(100, score));
    const t = clamped / 100; // 0..1
    const stake = maxStake - (maxStake - minStake) * t;
    // keep nice formatting
    return stake.toFixed(2).replace(/\.?0+$/, "");
}
}),
"[project]/app/event/EVT-ROCK-001/page.tsx [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {

const e = new Error("Could not parse module '[project]/app/event/EVT-ROCK-001/page.tsx'\n\nExpected '</', got '<eof>'");
e.code = 'MODULE_UNPARSABLE';
throw e;
}),
"[project]/node_modules/next/dist/server/route-modules/app-page/module.compiled.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
;
else {
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    else {
        if ("TURBOPACK compile-time truthy", 1) {
            if ("TURBOPACK compile-time truthy", 1) {
                module.exports = __turbopack_context__.r("[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)");
            } else //TURBOPACK unreachable
            ;
        } else //TURBOPACK unreachable
        ;
    }
} //# sourceMappingURL=module.compiled.js.map
}),
"[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

module.exports = __turbopack_context__.r("[project]/node_modules/next/dist/server/route-modules/app-page/module.compiled.js [app-ssr] (ecmascript)").vendored['react-ssr'].ReactJsxDevRuntime; //# sourceMappingURL=react-jsx-dev-runtime.js.map
}),
"[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

module.exports = __turbopack_context__.r("[project]/node_modules/next/dist/server/route-modules/app-page/module.compiled.js [app-ssr] (ecmascript)").vendored['react-ssr'].React; //# sourceMappingURL=react.js.map
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__340adee4._.js.map