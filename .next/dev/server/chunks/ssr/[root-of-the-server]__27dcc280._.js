module.exports = [
"[project]/ticketing/app/favicon.ico.mjs { IMAGE => \"[project]/ticketing/app/favicon.ico (static in ecmascript, tag client)\" } [app-rsc] (structured image object, ecmascript, Next.js Server Component)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/ticketing/app/favicon.ico.mjs { IMAGE => \"[project]/ticketing/app/favicon.ico (static in ecmascript, tag client)\" } [app-rsc] (structured image object, ecmascript)"));
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
"[project]/ticketing/app/layout.tsx [app-rsc] (ecmascript, Next.js Server Component)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/ticketing/app/layout.tsx [app-rsc] (ecmascript)"));
}),
"[project]/ticketing/lib/events.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
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
                priceXrp: "1",
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
                priceXrp: "1",
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
"[project]/ticketing/app/page.tsx [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Home
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$ticketing$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ticketing/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-jsx-dev-runtime.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ticketing$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ticketing/node_modules/next/dist/client/app-dir/link.react-server.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ticketing$2f$lib$2f$events$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ticketing/lib/events.ts [app-rsc] (ecmascript)");
;
;
;
function Home() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ticketing$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
        style: {
            padding: 24
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ticketing$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("nav", {
                style: {
                    marginBottom: 24
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ticketing$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$ticketing$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"], {
                        href: "/",
                        style: {
                            marginRight: 16
                        },
                        children: "Home"
                    }, void 0, false, {
                        fileName: "[project]/ticketing/app/page.tsx",
                        lineNumber: 8,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ticketing$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$ticketing$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"], {
                        href: "/my-tickets",
                        children: "My Tickets"
                    }, void 0, false, {
                        fileName: "[project]/ticketing/app/page.tsx",
                        lineNumber: 9,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/ticketing/app/page.tsx",
                lineNumber: 7,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ticketing$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                children: "Fen Ticketing (MVP)"
            }, void 0, false, {
                fileName: "[project]/ticketing/app/page.tsx",
                lineNumber: 11,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ticketing$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                children: "Hardcoded events:"
            }, void 0, false, {
                fileName: "[project]/ticketing/app/page.tsx",
                lineNumber: 12,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ticketing$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                children: __TURBOPACK__imported__module__$5b$project$5d2f$ticketing$2f$lib$2f$events$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["EVENTS"].map((e)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ticketing$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                        style: {
                            marginBottom: 12
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ticketing$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ticketing$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("b", {
                                        children: e.name
                                    }, void 0, false, {
                                        fileName: "[project]/ticketing/app/page.tsx",
                                        lineNumber: 16,
                                        columnNumber: 18
                                    }, this),
                                    " (",
                                    e.eventId,
                                    ")"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/ticketing/app/page.tsx",
                                lineNumber: 16,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ticketing$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    e.venueName,
                                    " • ",
                                    new Date(e.startTimeISO).toLocaleString()
                                ]
                            }, void 0, true, {
                                fileName: "[project]/ticketing/app/page.tsx",
                                lineNumber: 17,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ticketing$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$ticketing$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"], {
                                href: `/event/${e.eventId}`,
                                children: "View event"
                            }, void 0, false, {
                                fileName: "[project]/ticketing/app/page.tsx",
                                lineNumber: 18,
                                columnNumber: 13
                            }, this)
                        ]
                    }, e.eventId, true, {
                        fileName: "[project]/ticketing/app/page.tsx",
                        lineNumber: 15,
                        columnNumber: 11
                    }, this))
            }, void 0, false, {
                fileName: "[project]/ticketing/app/page.tsx",
                lineNumber: 13,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/ticketing/app/page.tsx",
        lineNumber: 6,
        columnNumber: 5
    }, this);
}
}),
"[project]/ticketing/app/page.tsx [app-rsc] (ecmascript, Next.js Server Component)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/ticketing/app/page.tsx [app-rsc] (ecmascript)"));
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__27dcc280._.js.map