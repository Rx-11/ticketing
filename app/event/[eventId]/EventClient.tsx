"use client";

import { useEffect, useMemo, useState } from "react";
import { requiredStakeXrp } from "@/lib/stake";
import { randomHex, sha256Hex } from "@/lib/hash";
import { makeCommitMemo } from "@/lib/xrplMemo";
import * as xrpl from "xrpl";

export default function EventClient({ eventId }: { eventId: string }) {
  const [seed, setSeed] = useState("");
  const [walletAddr, setWalletAddr] = useState("");
  const [score, setScore] = useState<number | null>(null);
  const [loadingScore, setLoadingScore] = useState(false);

  const [status, setStatus] = useState<string>("");
  const [commitHash, setCommitHash] = useState<string>("");
  const [secret, setSecret] = useState<string>("");
  const [nonce, setNonce] = useState<string>("");

  const xrplWs = process.env.NEXT_PUBLIC_XRPL_WS!;
  const platformAddr = process.env.NEXT_PUBLIC_PLATFORM_RECEIVE_ADDRESS!;

  // Hardcode tier for MVP
  const tierId = "GA";

  // Derive wallet address from seed
  useEffect(() => {
    try {
      if (!seed.trim()) {
        setWalletAddr("");
        return;
      }
      const w = xrpl.Wallet.fromSeed(seed.trim());
      setWalletAddr(w.classicAddress);
    } catch {
      setWalletAddr("");
    }
  }, [seed]);

  // Load score based on wallet address
  useEffect(() => {
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
      } finally {
        if (!cancelled) setLoadingScore(false);
      }
    }
    load();
    return () => { cancelled = true; };
  }, [walletAddr]);

  const stakeXrp = useMemo(() => (score === null ? null : requiredStakeXrp(score)), [score]);

  async function doCommit() {
    if (!seed.trim()) return setStatus("Enter a seed (testnet) to commit.");
    if (!walletAddr) return setStatus("Invalid seed.");
    if (!stakeXrp) return setStatus("Score not loaded yet.");
    if (!platformAddr?.startsWith("r")) return setStatus("Set NEXT_PUBLIC_PLATFORM_RECEIVE_ADDRESS.");

    setStatus("Preparing commit…");

    // 1) Generate secret+nonce and commit hash
    const sec = randomHex(16);
    const non = randomHex(16);
    const commitInput = `${eventId}|${tierId}|${walletAddr}|${sec}|${non}`;
    const cHash = await sha256Hex(commitInput);

    setSecret(sec);
    setNonce(non);
    setCommitHash(cHash);

    // 2) Submit stake payment with memo
    const client = new xrpl.Client(xrplWs);
    try {
      await client.connect();
      const wallet = xrpl.Wallet.fromSeed(seed.trim());

      const memo = makeCommitMemo(eventId, tierId, cHash);

      const tx: xrpl.Payment = {
        TransactionType: "Payment",
        Account: wallet.classicAddress,
        Destination: platformAddr,
        Amount: xrpl.xrpToDrops(stakeXrp),
        Memos: [memo],
      };

      setStatus("Submitting stake payment to XRPL…");

      const result = await client.submitAndWait(tx, { wallet });

      const txHash =
        (result.result as any)?.hash ||
        (result.result as any)?.tx_json?.hash;

      if (!txHash) {
        console.error(result);
        setStatus("Submitted, but couldn’t read tx hash. Check console.");
        return;
      }

      setStatus(`On-ledger commit tx confirmed: ${txHash}. Saving…`);

      // 3) Store commit in backend
      const saveRes = await fetch("/api/queue/commit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          eventId,
          tierId,
          wallet: walletAddr,
          stakeXrp,
          commitHash: cHash,
          commitTxHash: txHash,
        }),
      });

      const saveJson = await saveRes.json();
      if (!saveRes.ok) {
        setStatus(`Commit saved failed: ${saveJson.error || "unknown error"}`);
        return;
      }

      setStatus("✅ Commit complete (stake paid, memo on-chain, stored).");
    } catch (e: any) {
      console.error(e);
      setStatus(`Commit failed: ${e?.message || String(e)}`);
    } finally {
      try { await client.disconnect(); } catch {}
    }
  }

  return (
    <>
      <h2>Join Queue</h2>
      <div style={{ opacity: 0.7, marginBottom: 10 }}>Event: {eventId} • Tier: {tierId}</div>

      <div style={{ display: "grid", gap: 10, maxWidth: 720 }}>
        <label>
          Testnet seed (MVP/dev only):
          <input
            value={seed}
            onChange={(e) => setSeed(e.target.value)}
            placeholder="s████████████..."
            style={{ marginLeft: 8, width: "100%", padding: 8 }}
          />
        </label>

        <div>
          <b>Wallet:</b> {walletAddr || <span style={{ opacity: 0.6 }}>—</span>}
        </div>

        <div>
          {loadingScore && <div>Loading score…</div>}
          {!loadingScore && score !== null && (
            <>
              <div><b>FenScore:</b> {score}</div>
              <div><b>Required stake:</b> {stakeXrp} XRP</div>
            </>
          )}
        </div>

        <button onClick={doCommit} style={{ padding: "10px 12px", width: 200 }}>
          Commit (stake XRP)
        </button>

        {status && <div style={{ whiteSpace: "pre-wrap" }}>{status}</div>}

        {commitHash && (
          <div style={{ marginTop: 6 }}>
            <div><b>CommitHash:</b> {commitHash}</div>
            <div style={{ opacity: 0.7, fontSize: 12 }}>
              (secret+nonce generated locally; keep them for reveal step)
            </div>
            <div style={{ opacity: 0.7, fontSize: 12 }}>
              secret: {secret} • nonce: {nonce}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
