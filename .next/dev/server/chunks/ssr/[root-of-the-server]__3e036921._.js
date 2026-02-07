module.exports = [
"[project]/app/favicon.ico.mjs { IMAGE => \"[project]/app/favicon.ico (static in ecmascript, tag client)\" } [app-rsc] (structured image object, ecmascript, Next.js Server Component)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/app/favicon.ico.mjs { IMAGE => \"[project]/app/favicon.ico (static in ecmascript, tag client)\" } [app-rsc] (structured image object, ecmascript)"));
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
"[project]/app/layout.tsx [app-rsc] (ecmascript, Next.js Server Component)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/app/layout.tsx [app-rsc] (ecmascript)"));
}),
"[project]/lib/events.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
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
    const normalized = (eventId ?? "").trim();
    const evt = EVENTS.find((e)=>e.eventId.trim() === normalized);
    if (!evt) {
        // Helpful debug in terminal:
        console.error("[getEvent] Unknown eventId:", normalized);
        console.error("[getEvent] Known eventIds:", EVENTS.map((e)=>e.eventId));
        throw new Error(`Unknown eventId: ${normalized}`);
    }
    return evt;
}
function getTier(eventId, tierId) {
    const evt = getEvent(eventId);
    const tier = evt.tiers.find((t)=>t.tierId === tierId);
    if (!tier) throw new Error(`Unknown tierId: ${tierId} for eventId: ${eventId}`);
    return tier;
}
}),
"[project]/app/event/EVT-ROCK-001/EventClient.tsx [app-rsc] (client reference proxy) <module evaluation>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
// This file is generated by next-core EcmascriptClientReferenceModule.
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-server-dom-turbopack-server.js [app-rsc] (ecmascript)");
;
const __TURBOPACK__default__export__ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call the default export of [project]/app/event/EVT-ROCK-001/EventClient.tsx <module evaluation> from the server, but it's on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/app/event/EVT-ROCK-001/EventClient.tsx <module evaluation>", "default");
}),
"[project]/app/event/EVT-ROCK-001/EventClient.tsx [app-rsc] (client reference proxy)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
// This file is generated by next-core EcmascriptClientReferenceModule.
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-server-dom-turbopack-server.js [app-rsc] (ecmascript)");
;
const __TURBOPACK__default__export__ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call the default export of [project]/app/event/EVT-ROCK-001/EventClient.tsx from the server, but it's on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/app/event/EVT-ROCK-001/EventClient.tsx", "default");
}),
"[project]/app/event/EVT-ROCK-001/EventClient.tsx [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$event$2f$EVT$2d$ROCK$2d$001$2f$EventClient$2e$tsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/app/event/EVT-ROCK-001/EventClient.tsx [app-rsc] (client reference proxy) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$event$2f$EVT$2d$ROCK$2d$001$2f$EventClient$2e$tsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__ = __turbopack_context__.i("[project]/app/event/EVT-ROCK-001/EventClient.tsx [app-rsc] (client reference proxy)");
;
__turbopack_context__.n(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$event$2f$EVT$2d$ROCK$2d$001$2f$EventClient$2e$tsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__);
}),
"[project]/app/event/EVT-ROCK-001/page.tsx [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Page
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-jsx-dev-runtime.js [app-rsc] (ecmascript)");
// app/event/[eventId]/page.tsx
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$events$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/events.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$event$2f$EVT$2d$ROCK$2d$001$2f$EventClient$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/event/EVT-ROCK-001/EventClient.tsx [app-rsc] (ecmascript)");
;
;
;
function Page({ params }) {
    const event = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$events$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getEvent"])(params.eventId);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
        style: {
            padding: 24,
            maxWidth: 900
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                children: event.name
            }, void 0, false, {
                fileName: "[project]/app/event/EVT-ROCK-001/page.tsx",
                lineNumber: 10,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    opacity: 0.8
                },
                children: [
                    event.venueName,
                    " • ",
                    new Date(event.startTimeISO).toLocaleString()
                ]
            }, void 0, true, {
                fileName: "[project]/app/event/EVT-ROCK-001/page.tsx",
                lineNumber: 11,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("hr", {
                style: {
                    margin: "16px 0"
                }
            }, void 0, false, {
                fileName: "[project]/app/event/EVT-ROCK-001/page.tsx",
                lineNumber: 15,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$event$2f$EVT$2d$ROCK$2d$001$2f$EventClient$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"], {
                eventId: event.eventId
            }, void 0, false, {
                fileName: "[project]/app/event/EVT-ROCK-001/page.tsx",
                lineNumber: 18,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("hr", {
                style: {
                    margin: "16px 0"
                }
            }, void 0, false, {
                fileName: "[project]/app/event/EVT-ROCK-001/page.tsx",
                lineNumber: 20,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                children: "Ticket tiers"
            }, void 0, false, {
                fileName: "[project]/app/event/EVT-ROCK-001/page.tsx",
                lineNumber: 22,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                children: event.tiers.map((t)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                        style: {
                            marginBottom: 10
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("b", {
                                children: t.name
                            }, void 0, false, {
                                fileName: "[project]/app/event/EVT-ROCK-001/page.tsx",
                                lineNumber: 26,
                                columnNumber: 13
                            }, this),
                            " (",
                            t.tierId,
                            ") — ",
                            t.priceXrp,
                            " XRP — supply ",
                            t.supply,
                            " — resale cap",
                            " ",
                            t.resaleCapBps / 100,
                            "%."
                        ]
                    }, t.tierId, true, {
                        fileName: "[project]/app/event/EVT-ROCK-001/page.tsx",
                        lineNumber: 25,
                        columnNumber: 11
                    }, this))
            }, void 0, false, {
                fileName: "[project]/app/event/EVT-ROCK-001/page.tsx",
                lineNumber: 23,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("hr", {
                style: {
                    margin: "16px 0"
                }
            }, void 0, false, {
                fileName: "[project]/app/event/EVT-ROCK-001/page.tsx",
                lineNumber: 32,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                children: "Splits"
            }, void 0, false, {
                fileName: "[project]/app/event/EVT-ROCK-001/page.tsx",
                lineNumber: 34,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    display: "flex",
                    gap: 24,
                    flexWrap: "wrap"
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                style: {
                                    marginBottom: 6
                                },
                                children: "Primary"
                            }, void 0, false, {
                                fileName: "[project]/app/event/EVT-ROCK-001/page.tsx",
                                lineNumber: 37,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                                children: event.primarySplits.map((s)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                        children: [
                                            s.name,
                                            ": ",
                                            (s.bps / 100).toFixed(2),
                                            "% (",
                                            s.address,
                                            ")"
                                        ]
                                    }, s.name, true, {
                                        fileName: "[project]/app/event/EVT-ROCK-001/page.tsx",
                                        lineNumber: 40,
                                        columnNumber: 15
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/app/event/EVT-ROCK-001/page.tsx",
                                lineNumber: 38,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/event/EVT-ROCK-001/page.tsx",
                        lineNumber: 36,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                style: {
                                    marginBottom: 6
                                },
                                children: "Resale fees/royalty"
                            }, void 0, false, {
                                fileName: "[project]/app/event/EVT-ROCK-001/page.tsx",
                                lineNumber: 47,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                                children: [
                                    event.resaleSplits.map((s)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                            children: [
                                                s.name,
                                                ": ",
                                                (s.bps / 100).toFixed(2),
                                                "% (",
                                                s.address,
                                                ")"
                                            ]
                                        }, s.name, true, {
                                            fileName: "[project]/app/event/EVT-ROCK-001/page.tsx",
                                            lineNumber: 50,
                                            columnNumber: 15
                                        }, this)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                        children: [
                                            "seller:",
                                            " ",
                                            ((10000 - event.resaleSplits.reduce((acc, x)=>acc + x.bps, 0)) / 100).toFixed(2),
                                            "%"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/event/EVT-ROCK-001/page.tsx",
                                        lineNumber: 54,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/event/EVT-ROCK-001/page.tsx",
                                lineNumber: 48,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/event/EVT-ROCK-001/page.tsx",
                        lineNumber: 46,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/event/EVT-ROCK-001/page.tsx",
                lineNumber: 35,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/event/EVT-ROCK-001/page.tsx",
        lineNumber: 9,
        columnNumber: 5
    }, this);
}
}),
"[project]/app/event/EVT-ROCK-001/page.tsx [app-rsc] (ecmascript, Next.js Server Component)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/app/event/EVT-ROCK-001/page.tsx [app-rsc] (ecmascript)"));
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__3e036921._.js.map