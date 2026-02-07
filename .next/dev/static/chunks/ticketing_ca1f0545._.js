(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/ticketing/lib/stake.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
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
    const maxStake = 2.5;
    const minStake = 0.5;
    const clamped = Math.max(0, Math.min(100, score));
    const t = clamped / 100; // 0..1
    const stake = maxStake - (maxStake - minStake) * t;
    // keep nice formatting
    return stake.toFixed(2).replace(/\.?0+$/, "");
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/ticketing/lib/hash.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
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
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/ticketing/lib/xrplMemo.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// lib/xrplMemo.ts
__turbopack_context__.s([
    "makeCommitMemo",
    ()=>makeCommitMemo,
    "utf8ToHex",
    ()=>utf8ToHex
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$ticketing$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$buffer$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/ticketing/node_modules/next/dist/compiled/buffer/index.js [app-client] (ecmascript)");
function utf8ToHex(str) {
    return __TURBOPACK__imported__module__$5b$project$5d2f$ticketing$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$buffer$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Buffer"].from(str, "utf8").toString("hex").toUpperCase();
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
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/ticketing/app/event/[eventId]/EventClient.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>EventClient
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$ticketing$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/ticketing/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ticketing$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ticketing/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ticketing$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ticketing/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ticketing$2f$lib$2f$stake$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ticketing/lib/stake.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ticketing$2f$lib$2f$hash$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ticketing/lib/hash.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ticketing$2f$lib$2f$xrplMemo$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ticketing/lib/xrplMemo.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ticketing$2f$node_modules$2f$xrpl$2f$dist$2f$npm$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ticketing/node_modules/xrpl/dist/npm/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
function EventClient({ eventId }) {
    _s();
    const [seed, setSeed] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ticketing$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [walletAddr, setWalletAddr] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ticketing$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    // Helper for explorer links
    const explorerUrl = (type, id)=>`https://testnet.xrpl.org/${type === "tx" ? "transactions" : type}/${id}`;
    // Persist seed
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$ticketing$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "EventClient.useEffect": ()=>{
            const savedSeed = localStorage.getItem("fen_wallet_seed");
            if (savedSeed) setSeed(savedSeed);
        }
    }["EventClient.useEffect"], []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$ticketing$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "EventClient.useEffect": ()=>{
            if (seed) localStorage.setItem("fen_wallet_seed", seed);
        }
    }["EventClient.useEffect"], [
        seed
    ]);
    const [score, setScore] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ticketing$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [loadingScore, setLoadingScore] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ticketing$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [status, setStatus] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ticketing$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [commitHash, setCommitHash] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ticketing$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [secret, setSecret] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ticketing$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [nonce, setNonce] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ticketing$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const xrplWs = ("TURBOPACK compile-time value", "wss://s.altnet.rippletest.net:51233");
    const platformAddr = ("TURBOPACK compile-time value", "rakUrWgdMQYNVUXkPr5UvNhRrNp1FAgsmx");
    // Hardcode tier for MVP
    const tierId = "GA";
    // Derive wallet address from seed
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$ticketing$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "EventClient.useEffect": ()=>{
            try {
                if (!seed.trim()) {
                    setWalletAddr("");
                    return;
                }
                const w = __TURBOPACK__imported__module__$5b$project$5d2f$ticketing$2f$node_modules$2f$xrpl$2f$dist$2f$npm$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Wallet"].fromSeed(seed.trim());
                setWalletAddr(w.classicAddress);
            } catch  {
                setWalletAddr("");
            }
        }
    }["EventClient.useEffect"], [
        seed
    ]);
    // Load score based on wallet address
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$ticketing$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "EventClient.useEffect": ()=>{
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
            return ({
                "EventClient.useEffect": ()=>{
                    cancelled = true;
                }
            })["EventClient.useEffect"];
        }
    }["EventClient.useEffect"], [
        walletAddr
    ]);
    const stakeXrp = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ticketing$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "EventClient.useMemo[stakeXrp]": ()=>score === null ? null : (0, __TURBOPACK__imported__module__$5b$project$5d2f$ticketing$2f$lib$2f$stake$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["requiredStakeXrp"])(score)
    }["EventClient.useMemo[stakeXrp]"], [
        score
    ]);
    async function doCommit() {
        if (!seed.trim()) return setStatus("Enter a seed (testnet) to commit.");
        if (!walletAddr) return setStatus("Invalid seed.");
        if (!stakeXrp) return setStatus("Score not loaded yet.");
        if (!platformAddr?.startsWith("r")) return setStatus("Set NEXT_PUBLIC_PLATFORM_RECEIVE_ADDRESS.");
        setStatus("Preparing commit…");
        // 1) Generate secret+nonce and commit hash
        const sec = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ticketing$2f$lib$2f$hash$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["randomHex"])(16);
        const non = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ticketing$2f$lib$2f$hash$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["randomHex"])(16);
        const commitInput = `${eventId}|${tierId}|${walletAddr}|${sec}|${non}`;
        const cHash = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$ticketing$2f$lib$2f$hash$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["sha256Hex"])(commitInput);
        setSecret(sec);
        setNonce(non);
        setCommitHash(cHash);
        // 2) Submit stake payment with memo
        const client = new __TURBOPACK__imported__module__$5b$project$5d2f$ticketing$2f$node_modules$2f$xrpl$2f$dist$2f$npm$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Client"](xrplWs);
        try {
            await client.connect();
            const wallet = __TURBOPACK__imported__module__$5b$project$5d2f$ticketing$2f$node_modules$2f$xrpl$2f$dist$2f$npm$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Wallet"].fromSeed(seed.trim());
            const memo = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ticketing$2f$lib$2f$xrplMemo$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["makeCommitMemo"])(eventId, tierId, cHash);
            const tx = {
                TransactionType: "Payment",
                Account: wallet.classicAddress,
                Destination: platformAddr,
                Amount: __TURBOPACK__imported__module__$5b$project$5d2f$ticketing$2f$node_modules$2f$xrpl$2f$dist$2f$npm$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["xrpToDrops"](stakeXrp),
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
    // Poll queue status
    const [queueStatus, setQueueStatus] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ticketing$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$ticketing$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "EventClient.useEffect": ()=>{
            if (!walletAddr) {
                setQueueStatus(null);
                return;
            }
            const timer = setInterval({
                "EventClient.useEffect.timer": async ()=>{
                    try {
                        const res = await fetch(`/api/queue/status?eventId=${eventId}&tierId=${tierId}&wallet=${walletAddr}`);
                        const data = await res.json();
                        setQueueStatus(data);
                        // Auto-load secret/nonce from localStorage if found
                        const key = `fen_commit_${eventId}_${tierId}_${walletAddr}`;
                        const saved = localStorage.getItem(key);
                        if (saved) {
                            const { secret: s, nonce: n, hash: h } = JSON.parse(saved);
                            setSecret(s);
                            setNonce(n);
                            setCommitHash(h);
                        }
                    } catch (e) {
                        console.error("Queue poll error", e);
                    }
                }
            }["EventClient.useEffect.timer"], 3000);
            return ({
                "EventClient.useEffect": ()=>clearInterval(timer)
            })["EventClient.useEffect"];
        }
    }["EventClient.useEffect"], [
        walletAddr,
        eventId,
        tierId
    ]);
    // Save secret/nonce to localStorage when generated
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$ticketing$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "EventClient.useEffect": ()=>{
            if (commitHash && secret && nonce && walletAddr) {
                const key = `fen_commit_${eventId}_${tierId}_${walletAddr}`;
                localStorage.setItem(key, JSON.stringify({
                    secret,
                    nonce,
                    hash: commitHash
                }));
            }
        }
    }["EventClient.useEffect"], [
        commitHash,
        secret,
        nonce,
        walletAddr,
        eventId,
        tierId
    ]);
    async function doReveal() {
        if (!secret || !nonce) return setStatus("Missing secret/nonce. Did you clear your cache?");
        setStatus("Revealing and purchasing ticket (processing refund + NFT mint)…");
        try {
            const res = await fetch("/api/queue/reveal", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    eventId,
                    tierId,
                    wallet: walletAddr,
                    secret,
                    nonce
                })
            });
            const data = await res.json();
            if (!res.ok) {
                setStatus(`Reveal failed: ${data.error}`);
                return;
            }
            setStatus("✅ Success! Your stake has been refunded and your NFT ticket is being minted.");
        } catch (e) {
            setStatus(`Reveal error: ${e.message}`);
        }
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ticketing$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$ticketing$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ticketing$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            style: {
                display: "grid",
                gap: 10,
                maxWidth: 720
            },
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ticketing$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                    children: "1. Identity & Score"
                }, void 0, false, {
                    fileName: "[project]/ticketing/app/event/[eventId]/EventClient.tsx",
                    lineNumber: 217,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ticketing$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                    children: [
                        "Testnet seed (MVP/dev only):",
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ticketing$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                            value: seed,
                            onChange: (e)=>setSeed(e.target.value),
                            placeholder: "s████████████...",
                            style: {
                                marginLeft: 8,
                                width: "100%",
                                padding: 8,
                                background: "#111",
                                color: "#fff",
                                border: "1px solid #333"
                            }
                        }, void 0, false, {
                            fileName: "[project]/ticketing/app/event/[eventId]/EventClient.tsx",
                            lineNumber: 220,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/ticketing/app/event/[eventId]/EventClient.tsx",
                    lineNumber: 218,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ticketing$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ticketing$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("b", {
                            children: "Wallet:"
                        }, void 0, false, {
                            fileName: "[project]/ticketing/app/event/[eventId]/EventClient.tsx",
                            lineNumber: 229,
                            columnNumber: 11
                        }, this),
                        " ",
                        walletAddr || /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ticketing$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            style: {
                                opacity: 0.6
                            },
                            children: "—"
                        }, void 0, false, {
                            fileName: "[project]/ticketing/app/event/[eventId]/EventClient.tsx",
                            lineNumber: 229,
                            columnNumber: 41
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/ticketing/app/event/[eventId]/EventClient.tsx",
                    lineNumber: 228,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ticketing$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    children: [
                        loadingScore && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ticketing$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: "Loading score…"
                        }, void 0, false, {
                            fileName: "[project]/ticketing/app/event/[eventId]/EventClient.tsx",
                            lineNumber: 233,
                            columnNumber: 28
                        }, this),
                        !loadingScore && score !== null && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ticketing$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                padding: 12,
                                border: "1px solid #333",
                                borderRadius: 8,
                                background: "#0a0a0a"
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ticketing$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ticketing$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("b", {
                                            children: "FenScore:"
                                        }, void 0, false, {
                                            fileName: "[project]/ticketing/app/event/[eventId]/EventClient.tsx",
                                            lineNumber: 236,
                                            columnNumber: 20
                                        }, this),
                                        " ",
                                        score
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/ticketing/app/event/[eventId]/EventClient.tsx",
                                    lineNumber: 236,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ticketing$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ticketing$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("b", {
                                            children: "Required stake:"
                                        }, void 0, false, {
                                            fileName: "[project]/ticketing/app/event/[eventId]/EventClient.tsx",
                                            lineNumber: 237,
                                            columnNumber: 20
                                        }, this),
                                        " ",
                                        stakeXrp,
                                        " XRP"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/ticketing/app/event/[eventId]/EventClient.tsx",
                                    lineNumber: 237,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/ticketing/app/event/[eventId]/EventClient.tsx",
                            lineNumber: 235,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/ticketing/app/event/[eventId]/EventClient.tsx",
                    lineNumber: 232,
                    columnNumber: 9
                }, this),
                walletAddr && (!queueStatus || queueStatus.status === "not_found") && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ticketing$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$ticketing$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ticketing$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                            children: "2. Stake & Queue"
                        }, void 0, false, {
                            fileName: "[project]/ticketing/app/event/[eventId]/EventClient.tsx",
                            lineNumber: 244,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ticketing$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: doCommit,
                            style: {
                                padding: "10px 12px",
                                width: "100%",
                                background: "#0070f3",
                                color: "white",
                                border: "none",
                                borderRadius: 4,
                                cursor: "pointer"
                            },
                            children: [
                                "Commit (stake ",
                                stakeXrp,
                                " XRP)"
                            ]
                        }, void 0, true, {
                            fileName: "[project]/ticketing/app/event/[eventId]/EventClient.tsx",
                            lineNumber: 245,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true),
                queueStatus && queueStatus.status === "committed" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ticketing$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    style: {
                        padding: 12,
                        border: "1px solid #0070f3",
                        borderRadius: 8,
                        background: "rgba(0, 112, 243, 0.1)"
                    },
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ticketing$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                            children: "2. Queue Status"
                        }, void 0, false, {
                            fileName: "[project]/ticketing/app/event/[eventId]/EventClient.tsx",
                            lineNumber: 253,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ticketing$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                fontSize: 20,
                                fontWeight: "bold"
                            },
                            children: [
                                "Position: #",
                                queueStatus.position,
                                " / ",
                                queueStatus.total
                            ]
                        }, void 0, true, {
                            fileName: "[project]/ticketing/app/event/[eventId]/EventClient.tsx",
                            lineNumber: 254,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ticketing$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                opacity: 0.8,
                                marginTop: 8
                            },
                            children: [
                                "You have staked ",
                                queueStatus.entry.stakeXrp,
                                " XRP. Your commitment is on-ledger.",
                                queueStatus.entry.commitTxHash && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ticketing$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        marginTop: 4
                                    },
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ticketing$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                        href: explorerUrl("tx", queueStatus.entry.commitTxHash),
                                        target: "_blank",
                                        rel: "noopener noreferrer",
                                        style: {
                                            color: "#0070f3",
                                            fontSize: 12
                                        },
                                        children: "View Commit Tx on Explorer ↗"
                                    }, void 0, false, {
                                        fileName: "[project]/ticketing/app/event/[eventId]/EventClient.tsx",
                                        lineNumber: 259,
                                        columnNumber: 19
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/ticketing/app/event/[eventId]/EventClient.tsx",
                                    lineNumber: 258,
                                    columnNumber: 17
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/ticketing/app/event/[eventId]/EventClient.tsx",
                            lineNumber: 255,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ticketing$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                            style: {
                                marginTop: 24
                            },
                            children: "3. Buy Ticket (Reveal)"
                        }, void 0, false, {
                            fileName: "[project]/ticketing/app/event/[eventId]/EventClient.tsx",
                            lineNumber: 266,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ticketing$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            style: {
                                fontSize: 13,
                                opacity: 0.7
                            },
                            children: [
                                "Ready to buy? This will reveal your secret, refund your ",
                                queueStatus.entry.stakeXrp,
                                " XRP stake, and mint your NFT ticket.",
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ticketing$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("b", {
                                    children: " You will then need to accept the NFT offer to pay the ticket price."
                                }, void 0, false, {
                                    fileName: "[project]/ticketing/app/event/[eventId]/EventClient.tsx",
                                    lineNumber: 269,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/ticketing/app/event/[eventId]/EventClient.tsx",
                            lineNumber: 267,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ticketing$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: doReveal,
                            style: {
                                padding: "10px 12px",
                                width: "100%",
                                background: "#27ae60",
                                color: "white",
                                border: "none",
                                borderRadius: 4,
                                cursor: "pointer"
                            },
                            children: "Reveal & Buy Ticket"
                        }, void 0, false, {
                            fileName: "[project]/ticketing/app/event/[eventId]/EventClient.tsx",
                            lineNumber: 272,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/ticketing/app/event/[eventId]/EventClient.tsx",
                    lineNumber: 252,
                    columnNumber: 11
                }, this),
                queueStatus && queueStatus.status === "claimed" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ticketing$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    style: {
                        padding: 12,
                        border: "1px solid #27ae60",
                        borderRadius: 8,
                        background: "rgba(39, 174, 96, 0.1)"
                    },
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ticketing$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                            children: "🎉 Ticket Secured!"
                        }, void 0, false, {
                            fileName: "[project]/ticketing/app/event/[eventId]/EventClient.tsx",
                            lineNumber: 280,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ticketing$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            children: "Your stake has been refunded. Your NFT ticket is minted and a 1 XRP offer has been created for you."
                        }, void 0, false, {
                            fileName: "[project]/ticketing/app/event/[eventId]/EventClient.tsx",
                            lineNumber: 281,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ticketing$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                fontSize: 12,
                                opacity: 0.7,
                                wordBreak: "break-all"
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ticketing$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("b", {
                                    children: "Refund Tx:"
                                }, void 0, false, {
                                    fileName: "[project]/ticketing/app/event/[eventId]/EventClient.tsx",
                                    lineNumber: 283,
                                    columnNumber: 15
                                }, this),
                                " ",
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ticketing$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                    href: explorerUrl("tx", queueStatus.entry.revealTxHash),
                                    target: "_blank",
                                    rel: "noopener noreferrer",
                                    style: {
                                        color: "#27ae60"
                                    },
                                    children: queueStatus.entry.revealTxHash
                                }, void 0, false, {
                                    fileName: "[project]/ticketing/app/event/[eventId]/EventClient.tsx",
                                    lineNumber: 283,
                                    columnNumber: 33
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ticketing$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("br", {}, void 0, false, {
                                    fileName: "[project]/ticketing/app/event/[eventId]/EventClient.tsx",
                                    lineNumber: 283,
                                    columnNumber: 200
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ticketing$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("b", {
                                    children: "NFT ID:"
                                }, void 0, false, {
                                    fileName: "[project]/ticketing/app/event/[eventId]/EventClient.tsx",
                                    lineNumber: 284,
                                    columnNumber: 15
                                }, this),
                                " ",
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ticketing$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                    href: explorerUrl("nft", queueStatus.entry.nftId),
                                    target: "_blank",
                                    rel: "noopener noreferrer",
                                    style: {
                                        color: "#27ae60"
                                    },
                                    children: queueStatus.entry.nftId
                                }, void 0, false, {
                                    fileName: "[project]/ticketing/app/event/[eventId]/EventClient.tsx",
                                    lineNumber: 284,
                                    columnNumber: 30
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ticketing$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("br", {}, void 0, false, {
                                    fileName: "[project]/ticketing/app/event/[eventId]/EventClient.tsx",
                                    lineNumber: 284,
                                    columnNumber: 184
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ticketing$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("b", {
                                    children: "Offer Tx:"
                                }, void 0, false, {
                                    fileName: "[project]/ticketing/app/event/[eventId]/EventClient.tsx",
                                    lineNumber: 285,
                                    columnNumber: 15
                                }, this),
                                " ",
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ticketing$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                    href: explorerUrl("tx", queueStatus.entry.offerTxHash),
                                    target: "_blank",
                                    rel: "noopener noreferrer",
                                    style: {
                                        color: "#27ae60"
                                    },
                                    children: queueStatus.entry.offerTxHash || "N/A"
                                }, void 0, false, {
                                    fileName: "[project]/ticketing/app/event/[eventId]/EventClient.tsx",
                                    lineNumber: 285,
                                    columnNumber: 32
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/ticketing/app/event/[eventId]/EventClient.tsx",
                            lineNumber: 282,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/ticketing/app/event/[eventId]/EventClient.tsx",
                    lineNumber: 279,
                    columnNumber: 11
                }, this),
                status && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ticketing$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    style: {
                        marginTop: 12,
                        padding: 10,
                        background: "#222",
                        borderRadius: 4,
                        fontSize: 14
                    },
                    children: status
                }, void 0, false, {
                    fileName: "[project]/ticketing/app/event/[eventId]/EventClient.tsx",
                    lineNumber: 292,
                    columnNumber: 11
                }, this),
                queueStatus && queueStatus.queueList && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ticketing$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    style: {
                        marginTop: 24,
                        padding: 16,
                        border: "1px solid #333",
                        borderRadius: 8,
                        background: "#050505"
                    },
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ticketing$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                            style: {
                                marginTop: 0
                            },
                            children: "4. Live Queue (On-Ledger)"
                        }, void 0, false, {
                            fileName: "[project]/ticketing/app/event/[eventId]/EventClient.tsx",
                            lineNumber: 299,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ticketing$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                display: "grid",
                                gap: 10
                            },
                            children: queueStatus.queueList.map((q, i)=>{
                                const isMe = q.wallet === walletAddr;
                                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ticketing$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        display: "flex",
                                        justifyContent: "space-between",
                                        alignItems: "center",
                                        padding: "8px 12px",
                                        background: isMe ? "rgba(0, 112, 243, 0.1)" : "#111",
                                        border: isMe ? "1px solid #0070f3" : "1px solid #222",
                                        borderRadius: 6
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ticketing$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ticketing$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    style: {
                                                        fontSize: 13,
                                                        fontWeight: "bold"
                                                    },
                                                    children: [
                                                        "#",
                                                        i + 1,
                                                        " ",
                                                        q.wallet.slice(0, 8),
                                                        "...",
                                                        q.wallet.slice(-4),
                                                        " ",
                                                        isMe && "(You)"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/ticketing/app/event/[eventId]/EventClient.tsx",
                                                    lineNumber: 314,
                                                    columnNumber: 23
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ticketing$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    style: {
                                                        fontSize: 11,
                                                        opacity: 0.6
                                                    },
                                                    children: [
                                                        "Staked at ",
                                                        new Date(q.createdAt).toLocaleTimeString()
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/ticketing/app/event/[eventId]/EventClient.tsx",
                                                    lineNumber: 317,
                                                    columnNumber: 23
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/ticketing/app/event/[eventId]/EventClient.tsx",
                                            lineNumber: 313,
                                            columnNumber: 21
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ticketing$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                            href: explorerUrl("tx", q.commitTxHash),
                                            target: "_blank",
                                            rel: "noopener noreferrer",
                                            style: {
                                                fontSize: 11,
                                                color: "#0070f3",
                                                textDecoration: "none"
                                            },
                                            children: "Verify Tx ↗"
                                        }, void 0, false, {
                                            fileName: "[project]/ticketing/app/event/[eventId]/EventClient.tsx",
                                            lineNumber: 321,
                                            columnNumber: 21
                                        }, this)
                                    ]
                                }, i, true, {
                                    fileName: "[project]/ticketing/app/event/[eventId]/EventClient.tsx",
                                    lineNumber: 304,
                                    columnNumber: 19
                                }, this);
                            })
                        }, void 0, false, {
                            fileName: "[project]/ticketing/app/event/[eventId]/EventClient.tsx",
                            lineNumber: 300,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/ticketing/app/event/[eventId]/EventClient.tsx",
                    lineNumber: 298,
                    columnNumber: 11
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/ticketing/app/event/[eventId]/EventClient.tsx",
            lineNumber: 216,
            columnNumber: 7
        }, this)
    }, void 0, false);
}
_s(EventClient, "oAIJrRtwPJufoMJRW23x737cz6Y=");
_c = EventClient;
var _c;
__turbopack_context__.k.register(_c, "EventClient");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=ticketing_ca1f0545._.js.map