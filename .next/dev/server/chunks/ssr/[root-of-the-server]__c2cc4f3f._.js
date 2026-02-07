module.exports = [
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[project]/ticketing/lib/stake.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
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
"[project]/ticketing/lib/hash.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// lib/hash.ts
__turbopack_context__.s([
    "randomHex",
    ()=>randomHex,
    "sha256Hex",
    ()=>sha256Hex
]);
async function sha256Hex(input) {
    const enc = new TextEncoder();
    const bytes = enc.encode(input);
    const digest = await crypto.subtle.digest("SHA-256", bytes);
    return [
        ...new Uint8Array(digest)
    ].map((b)=>b.toString(16).padStart(2, "0")).join("");
}
function randomHex(bytes) {
    const arr = new Uint8Array(bytes);
    crypto.getRandomValues(arr);
    return [
        ...arr
    ].map((b)=>b.toString(16).padStart(2, "0")).join("");
}
}),
"[project]/ticketing/lib/xrplMemo.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// lib/xrplMemo.ts
__turbopack_context__.s([
    "makeCommitMemo",
    ()=>makeCommitMemo,
    "utf8ToHex",
    ()=>utf8ToHex
]);
function utf8ToHex(str) {
    return Buffer.from(str, "utf8").toString("hex").toUpperCase();
}
function makeCommitMemo(eventId, tierId, commitHash) {
    // Keep it short. XRPL memos are hex strings.
    const memoString = `COMMIT|${eventId}|${tierId}|${commitHash}`;
    return {
        Memo: {
            MemoType: utf8ToHex("FEN"),
            MemoData: utf8ToHex(memoString)
        }
    };
}
}),
"[externals]/node:crypto [external] (node:crypto, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("node:crypto", () => require("node:crypto"));

module.exports = mod;
}),
"[externals]/crypto [external] (crypto, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("crypto", () => require("crypto"));

module.exports = mod;
}),
"[externals]/events [external] (events, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("events", () => require("events"));

module.exports = mod;
}),
"[externals]/https [external] (https, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("https", () => require("https"));

module.exports = mod;
}),
"[externals]/http [external] (http, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("http", () => require("http"));

module.exports = mod;
}),
"[externals]/net [external] (net, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("net", () => require("net"));

module.exports = mod;
}),
"[externals]/tls [external] (tls, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("tls", () => require("tls"));

module.exports = mod;
}),
"[externals]/stream [external] (stream, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("stream", () => require("stream"));

module.exports = mod;
}),
"[externals]/url [external] (url, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("url", () => require("url"));

module.exports = mod;
}),
"[externals]/zlib [external] (zlib, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("zlib", () => require("zlib"));

module.exports = mod;
}),
"[externals]/buffer [external] (buffer, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("buffer", () => require("buffer"));

module.exports = mod;
}),
"[project]/ticketing/app/event/[eventId]/EventClient.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>EventClient
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$ticketing$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ticketing/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ticketing$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ticketing/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ticketing$2f$lib$2f$stake$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ticketing/lib/stake.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ticketing$2f$lib$2f$hash$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ticketing/lib/hash.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ticketing$2f$lib$2f$xrplMemo$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ticketing/lib/xrplMemo.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ticketing$2f$node_modules$2f$xrpl$2f$dist$2f$npm$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ticketing/node_modules/xrpl/dist/npm/index.js [app-ssr] (ecmascript)");
"use client";
;
;
;
;
;
;
function EventClient({ eventId }) {
    const [seed, setSeed] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ticketing$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("");
    const [walletAddr, setWalletAddr] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ticketing$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("");
    const [score, setScore] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ticketing$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [loadingScore, setLoadingScore] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ticketing$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [status, setStatus] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ticketing$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("");
    const [commitHash, setCommitHash] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ticketing$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("");
    const [secret, setSecret] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ticketing$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("");
    const [nonce, setNonce] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ticketing$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("");
    const xrplWs = ("TURBOPACK compile-time value", "wss://s.altnet.rippletest.net:51233");
    const platformAddr = ("TURBOPACK compile-time value", "rL35NKQHwnDbXtgbRreJNx3EFaA789hrbd");
    // Hardcode tier for MVP
    const tierId = "GA";
    // Derive wallet address from seed
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$ticketing$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        try {
            if (!seed.trim()) {
                setWalletAddr("");
                return;
            }
            const w = __TURBOPACK__imported__module__$5b$project$5d2f$ticketing$2f$node_modules$2f$xrpl$2f$dist$2f$npm$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Wallet"].fromSeed(seed.trim());
            setWalletAddr(w.classicAddress);
        } catch  {
            setWalletAddr("");
        }
    }, [
        seed
    ]);
    // Load score based on wallet address
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$ticketing$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        let cancelled = false;
        async function load() {
            if (!walletAddr) {
                setScore(null);
                return;
            }
            setLoadingScore(true);
            try {
                const res = await fetch(`/api/score?wallet=${encodeURIComponent(walletAddr)}`);
                const data = await res.json();
                if (!cancelled) setScore(data.score ?? 0);
            } finally{
                if (!cancelled) setLoadingScore(false);
            }
        }
        load();
        return ()=>{
            cancelled = true;
        };
    }, [
        walletAddr
    ]);
    const stakeXrp = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ticketing$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>score === null ? null : (0, __TURBOPACK__imported__module__$5b$project$5d2f$ticketing$2f$lib$2f$stake$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["requiredStakeXrp"])(score), [
        score
    ]);
    async function doCommit() {
        if (!seed.trim()) return setStatus("Enter a seed (testnet) to commit.");
        if (!walletAddr) return setStatus("Invalid seed.");
        if (!stakeXrp) return setStatus("Score not loaded yet.");
        if (!platformAddr?.startsWith("r")) return setStatus("Set NEXT_PUBLIC_PLATFORM_RECEIVE_ADDRESS.");
        setStatus("Preparing commit…");
        // 1) Generate secret+nonce and commit hash
        const sec = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ticketing$2f$lib$2f$hash$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["randomHex"])(16);
        const non = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ticketing$2f$lib$2f$hash$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["randomHex"])(16);
        const commitInput = `${eventId}|${tierId}|${walletAddr}|${sec}|${non}`;
        const cHash = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$ticketing$2f$lib$2f$hash$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["sha256Hex"])(commitInput);
        setSecret(sec);
        setNonce(non);
        setCommitHash(cHash);
        // 2) Submit stake payment with memo
        const client = new __TURBOPACK__imported__module__$5b$project$5d2f$ticketing$2f$node_modules$2f$xrpl$2f$dist$2f$npm$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Client"](xrplWs);
        try {
            await client.connect();
            const wallet = __TURBOPACK__imported__module__$5b$project$5d2f$ticketing$2f$node_modules$2f$xrpl$2f$dist$2f$npm$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Wallet"].fromSeed(seed.trim());
            const memo = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ticketing$2f$lib$2f$xrplMemo$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["makeCommitMemo"])(eventId, tierId, cHash);
            const tx = {
                TransactionType: "Payment",
                Account: wallet.classicAddress,
                Destination: platformAddr,
                Amount: __TURBOPACK__imported__module__$5b$project$5d2f$ticketing$2f$node_modules$2f$xrpl$2f$dist$2f$npm$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["xrpToDrops"](stakeXrp),
                Memos: [
                    memo
                ]
            };
            setStatus("Submitting stake payment to XRPL…");
            const result = await client.submitAndWait(tx, {
                wallet
            });
            const txHash = result.result?.hash || result.result?.tx_json?.hash;
            if (!txHash) {
                console.error(result);
                setStatus("Submitted, but couldn’t read tx hash. Check console.");
                return;
            }
            setStatus(`On-ledger commit tx confirmed: ${txHash}. Saving…`);
            // 3) Store commit in backend
            const saveRes = await fetch("/api/queue/commit", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    eventId,
                    tierId,
                    wallet: walletAddr,
                    stakeXrp,
                    commitHash: cHash,
                    commitTxHash: txHash
                })
            });
            const saveJson = await saveRes.json();
            if (!saveRes.ok) {
                setStatus(`Commit saved failed: ${saveJson.error || "unknown error"}`);
                return;
            }
            setStatus("✅ Commit complete (stake paid, memo on-chain, stored).");
        } catch (e) {
            console.error(e);
            setStatus(`Commit failed: ${e?.message || String(e)}`);
        } finally{
            try {
                await client.disconnect();
            } catch  {}
        }
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ticketing$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$ticketing$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ticketing$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                children: "Join Queue"
            }, void 0, false, {
                fileName: "[project]/ticketing/app/event/[eventId]/EventClient.tsx",
                lineNumber: 144,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ticketing$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    opacity: 0.7,
                    marginBottom: 10
                },
                children: [
                    "Event: ",
                    eventId,
                    " • Tier: ",
                    tierId
                ]
            }, void 0, true, {
                fileName: "[project]/ticketing/app/event/[eventId]/EventClient.tsx",
                lineNumber: 145,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ticketing$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    display: "grid",
                    gap: 10,
                    maxWidth: 720
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ticketing$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                        children: [
                            "Testnet seed (MVP/dev only):",
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ticketing$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                value: seed,
                                onChange: (e)=>setSeed(e.target.value),
                                placeholder: "s████████████...",
                                style: {
                                    marginLeft: 8,
                                    width: "100%",
                                    padding: 8
                                }
                            }, void 0, false, {
                                fileName: "[project]/ticketing/app/event/[eventId]/EventClient.tsx",
                                lineNumber: 150,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/ticketing/app/event/[eventId]/EventClient.tsx",
                        lineNumber: 148,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ticketing$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ticketing$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("b", {
                                children: "Wallet:"
                            }, void 0, false, {
                                fileName: "[project]/ticketing/app/event/[eventId]/EventClient.tsx",
                                lineNumber: 159,
                                columnNumber: 11
                            }, this),
                            " ",
                            walletAddr || /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ticketing$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                style: {
                                    opacity: 0.6
                                },
                                children: "—"
                            }, void 0, false, {
                                fileName: "[project]/ticketing/app/event/[eventId]/EventClient.tsx",
                                lineNumber: 159,
                                columnNumber: 41
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/ticketing/app/event/[eventId]/EventClient.tsx",
                        lineNumber: 158,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ticketing$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            loadingScore && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ticketing$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: "Loading score…"
                            }, void 0, false, {
                                fileName: "[project]/ticketing/app/event/[eventId]/EventClient.tsx",
                                lineNumber: 163,
                                columnNumber: 28
                            }, this),
                            !loadingScore && score !== null && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ticketing$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$ticketing$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ticketing$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ticketing$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("b", {
                                                children: "FenScore:"
                                            }, void 0, false, {
                                                fileName: "[project]/ticketing/app/event/[eventId]/EventClient.tsx",
                                                lineNumber: 166,
                                                columnNumber: 20
                                            }, this),
                                            " ",
                                            score
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/ticketing/app/event/[eventId]/EventClient.tsx",
                                        lineNumber: 166,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ticketing$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ticketing$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("b", {
                                                children: "Required stake:"
                                            }, void 0, false, {
                                                fileName: "[project]/ticketing/app/event/[eventId]/EventClient.tsx",
                                                lineNumber: 167,
                                                columnNumber: 20
                                            }, this),
                                            " ",
                                            stakeXrp,
                                            " XRP"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/ticketing/app/event/[eventId]/EventClient.tsx",
                                        lineNumber: 167,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/ticketing/app/event/[eventId]/EventClient.tsx",
                        lineNumber: 162,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ticketing$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: doCommit,
                        style: {
                            padding: "10px 12px",
                            width: 200
                        },
                        children: "Commit (stake XRP)"
                    }, void 0, false, {
                        fileName: "[project]/ticketing/app/event/[eventId]/EventClient.tsx",
                        lineNumber: 172,
                        columnNumber: 9
                    }, this),
                    status && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ticketing$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            whiteSpace: "pre-wrap"
                        },
                        children: status
                    }, void 0, false, {
                        fileName: "[project]/ticketing/app/event/[eventId]/EventClient.tsx",
                        lineNumber: 176,
                        columnNumber: 20
                    }, this),
                    commitHash && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ticketing$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            marginTop: 6
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ticketing$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ticketing$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("b", {
                                        children: "CommitHash:"
                                    }, void 0, false, {
                                        fileName: "[project]/ticketing/app/event/[eventId]/EventClient.tsx",
                                        lineNumber: 180,
                                        columnNumber: 18
                                    }, this),
                                    " ",
                                    commitHash
                                ]
                            }, void 0, true, {
                                fileName: "[project]/ticketing/app/event/[eventId]/EventClient.tsx",
                                lineNumber: 180,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ticketing$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    opacity: 0.7,
                                    fontSize: 12
                                },
                                children: "(secret+nonce generated locally; keep them for reveal step)"
                            }, void 0, false, {
                                fileName: "[project]/ticketing/app/event/[eventId]/EventClient.tsx",
                                lineNumber: 181,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ticketing$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    opacity: 0.7,
                                    fontSize: 12
                                },
                                children: [
                                    "secret: ",
                                    secret,
                                    " • nonce: ",
                                    nonce
                                ]
                            }, void 0, true, {
                                fileName: "[project]/ticketing/app/event/[eventId]/EventClient.tsx",
                                lineNumber: 184,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/ticketing/app/event/[eventId]/EventClient.tsx",
                        lineNumber: 179,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/ticketing/app/event/[eventId]/EventClient.tsx",
                lineNumber: 147,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true);
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__c2cc4f3f._.js.map