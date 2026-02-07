"use client";

import { useEffect, useMemo, useState } from "react";
import { requiredStakeXrp } from "@/lib/stake";
import { randomHex, sha256Hex } from "@/lib/hash";
import { makeCommitMemo } from "@/lib/xrplMemo";
import * as xrpl from "xrpl";

export default function EventClient({ eventId }: { eventId: string }) {
  const [seed, setSeed] = useState("");
  const [walletAddr, setWalletAddr] = useState("");

  const explorerUrl = (type: "tx" | "nft" | "address", id: string) =>
    `https://testnet.xrpl.org/${type === "tx" ? "transactions" : type}/${id}`;

  // Persist seed
  useEffect(() => {
    const savedSeed = localStorage.getItem("fen_wallet_seed");
    if (savedSeed) setSeed(savedSeed);
  }, []);

  useEffect(() => {
    if (seed) localStorage.setItem("fen_wallet_seed", seed);
  }, [seed]);

  const [score, setScore] = useState<number | null>(null);
  const [loadingScore, setLoadingScore] = useState(false);

  const [status, setStatus] = useState<string>("");
  const [commitHash, setCommitHash] = useState<string>("");
  const [secret, setSecret] = useState<string>("");
  const [nonce, setNonce] = useState<string>("");

  const [committing, setCommitting] = useState(false);
  const [revealing, setRevealing] = useState(false);

  const xrplWs = process.env.NEXT_PUBLIC_XRPL_WS!;
  const platformAddr = process.env.NEXT_PUBLIC_PLATFORM_RECEIVE_ADDRESS!;

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

  // Load score
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
    return () => {
      cancelled = true;
    };
  }, [walletAddr]);

  const stakeXrp = useMemo(
    () => (score === null ? null : requiredStakeXrp(score)),
    [score]
  );

  async function doCommit() {
    if (!seed.trim()) return setStatus("Enter a seed (testnet) to commit.");
    if (!walletAddr) return setStatus("Invalid seed.");
    if (!stakeXrp) return setStatus("Score not loaded yet.");
    if (!platformAddr?.startsWith("r"))
      return setStatus("Set NEXT_PUBLIC_PLATFORM_RECEIVE_ADDRESS.");

    setCommitting(true);
    setStatus("Preparing commit…");

    const sec = randomHex(16);
    const non = randomHex(16);
    const commitInput = `${eventId}|${tierId}|${walletAddr}|${sec}|${non}`;
    const cHash = await sha256Hex(commitInput);

    setSecret(sec);
    setNonce(non);
    setCommitHash(cHash);

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
        setStatus("Submitted, but couldn't read tx hash. Check console.");
        setCommitting(false);
        return;
      }

      setStatus(`On-ledger commit tx confirmed. Saving…`);

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
        setStatus(`Commit save failed: ${saveJson.error || "unknown error"}`);
        setCommitting(false);
        return;
      }

      setStatus("✅ Commit complete — stake paid, memo on-chain, stored.");
    } catch (e: any) {
      console.error(e);
      setStatus(`Commit failed: ${e?.message || String(e)}`);
    } finally {
      setCommitting(false);
      try {
        await client.disconnect();
      } catch {}
    }
  }

  // Poll queue status
  const [queueStatus, setQueueStatus] = useState<any>(null);
  useEffect(() => {
    if (!walletAddr) {
      setQueueStatus(null);
      return;
    }
    const timer = setInterval(async () => {
      try {
        const res = await fetch(
          `/api/queue/status?eventId=${eventId}&tierId=${tierId}&wallet=${walletAddr}`
        );
        const data = await res.json();
        setQueueStatus(data);

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
    }, 3000);
    return () => clearInterval(timer);
  }, [walletAddr, eventId, tierId]);

  // Save secret/nonce to localStorage
  useEffect(() => {
    if (commitHash && secret && nonce && walletAddr) {
      const key = `fen_commit_${eventId}_${tierId}_${walletAddr}`;
      localStorage.setItem(
        key,
        JSON.stringify({ secret, nonce, hash: commitHash })
      );
    }
  }, [commitHash, secret, nonce, walletAddr, eventId, tierId]);

  async function doReveal() {
    if (!secret || !nonce)
      return setStatus("Missing secret/nonce. Did you clear your cache?");

    setRevealing(true);
    setStatus("Revealing and purchasing ticket…");

    try {
      const res = await fetch("/api/queue/reveal", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          eventId,
          tierId,
          wallet: walletAddr,
          secret,
          nonce,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setStatus(`Reveal failed: ${data.error}`);
        setRevealing(false);
        return;
      }
      setStatus(
        "✅ Success! Your stake has been refunded and your NFT ticket is being minted."
      );
    } catch (e: any) {
      setStatus(`Reveal error: ${e.message}`);
    } finally {
      setRevealing(false);
    }
  }

  const isProcessing = committing || revealing;

  return (
    <div className="space-y-5">
      {/* ── Step 1: Identity & Score ──────────── */}
      <div className="glass p-5 space-y-4">
        <h3 className="text-sm font-semibold uppercase tracking-wider text-[var(--text-muted)]">
          1 · Identity &amp; Score
        </h3>

        <div>
          <label className="text-xs font-medium text-[var(--text-secondary)] mb-1.5 block">
            Testnet seed (dev only)
          </label>
          <input
            value={seed}
            onChange={(e) => setSeed(e.target.value)}
            placeholder="s████████████..."
            className="input-glass"
            type="password"
          />
        </div>

        {walletAddr && (
          <div className="text-xs font-mono text-[var(--text-muted)] break-all">
            Wallet: {walletAddr}
          </div>
        )}

        {loadingScore && (
          <div className="flex items-center gap-2 text-sm text-[var(--text-muted)]">
            <span className="spinner spinner-sm spinner-indigo" />
            Loading score…
          </div>
        )}

        {!loadingScore && score !== null && (
          <div className="flex gap-3">
            <div className="stat-pill flex-1">
              <span className="label">FenScore</span>
              <span className="value">{score}</span>
            </div>
            <div className="stat-pill flex-1">
              <span className="label">Required Stake</span>
              <span className="value">{stakeXrp} XRP</span>
            </div>
          </div>
        )}
      </div>

      {/* ── Step 2: Commit / Queue ────────────── */}
      {walletAddr && (!queueStatus || queueStatus.status === "not_found") && (
        <div className="glass p-5 space-y-4 slide-up">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-[var(--text-muted)]">
            2 · Stake &amp; Queue
          </h3>

          {committing ? (
            <div className="processing-overlay">
              <span className="spinner" />
              <div>
                <p className="text-sm font-semibold text-[var(--text-primary)]">
                  Processing on XRPL…
                </p>
                <p className="text-xs text-[var(--text-muted)] mt-1">
                  {status}
                </p>
              </div>
            </div>
          ) : (
            <button
              onClick={doCommit}
              disabled={isProcessing}
              className="btn-primary w-full"
            >
              Commit — Stake {stakeXrp} XRP
            </button>
          )}
        </div>
      )}

      {/* ── Committed state: queue position ───── */}
      {queueStatus && queueStatus.status === "committed" && (
        <div className="glass p-5 space-y-4 slide-up" style={{ borderColor: "rgba(99,102,241,0.25)" }}>
          <h3 className="text-sm font-semibold uppercase tracking-wider text-[var(--text-muted)]">
            2 · Queue Status
          </h3>

          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold text-[var(--text-primary)]">
              #{queueStatus.position}
            </span>
            <span className="text-sm text-[var(--text-muted)]">
              / {queueStatus.total} in queue
            </span>
          </div>

          <p className="text-xs text-[var(--text-secondary)]">
            Staked {queueStatus.entry.stakeXrp} XRP — commitment is on-ledger.
          </p>

          {queueStatus.entry.commitTxHash && (
            <a
              href={explorerUrl("tx", queueStatus.entry.commitTxHash)}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-medium text-indigo-500 hover:text-indigo-600 transition-colors"
            >
              View Commit Tx on Explorer ↗
            </a>
          )}

          {/* Reveal / Buy */}
          <div className="pt-4 border-t border-black/5 space-y-3">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-[var(--text-muted)]">
              3 · Buy Ticket (Reveal)
            </h3>
            <p className="text-xs text-[var(--text-secondary)]">
              This will reveal your secret, refund your{" "}
              {queueStatus.entry.stakeXrp} XRP stake, and mint your NFT ticket.
              <strong> You'll then need to accept the NFT offer to pay the ticket price.</strong>
            </p>

            {revealing ? (
              <div className="processing-overlay">
                <span className="spinner spinner-mint" style={{ width: 40, height: 40, borderWidth: 3 }} />
                <div>
                  <p className="text-sm font-semibold text-[var(--text-primary)]">
                    Minting your NFT ticket…
                  </p>
                  <p className="text-xs text-[var(--text-muted)] mt-1">
                    {status}
                  </p>
                </div>
              </div>
            ) : (
              <button
                onClick={doReveal}
                disabled={isProcessing}
                className="btn-primary w-full"
                style={{
                  background: "linear-gradient(135deg, #059669 0%, #34d399 100%)",
                  boxShadow: "0 2px 8px rgba(5,150,105,0.25), inset 0 1px 0 rgba(255,255,255,0.15)",
                }}
              >
                Reveal &amp; Buy Ticket
              </button>
            )}
          </div>
        </div>
      )}

      {/* ── Claimed state: success ────────────── */}
      {queueStatus && queueStatus.status === "claimed" && (
        <div
          className="glass p-5 space-y-4 slide-up"
          style={{ borderColor: "rgba(52,211,153,0.3)" }}
        >
          <div className="flex items-center gap-2">
            <span className="text-2xl">🎉</span>
            <h3 className="text-lg font-bold text-[var(--text-primary)]">
              Ticket Secured!
            </h3>
          </div>
          <p className="text-sm text-[var(--text-secondary)]">
            Your stake has been refunded. Your NFT ticket is minted and a sell
            offer has been created for you.
          </p>

          <div className="space-y-2 text-xs text-[var(--text-muted)] break-all">
            {queueStatus.entry.revealTxHash && (
              <div>
                <span className="font-semibold text-[var(--text-secondary)]">Refund Tx: </span>
                <a
                  href={explorerUrl("tx", queueStatus.entry.revealTxHash)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-emerald-600 hover:text-emerald-700 transition-colors"
                >
                  {queueStatus.entry.revealTxHash}
                </a>
              </div>
            )}
            {queueStatus.entry.nftId && (
              <div>
                <span className="font-semibold text-[var(--text-secondary)]">NFT ID: </span>
                <a
                  href={explorerUrl("nft", queueStatus.entry.nftId)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-emerald-600 hover:text-emerald-700 transition-colors"
                >
                  {queueStatus.entry.nftId}
                </a>
              </div>
            )}
            {queueStatus.entry.offerTxHash && (
              <div>
                <span className="font-semibold text-[var(--text-secondary)]">Offer Tx: </span>
                <a
                  href={explorerUrl("tx", queueStatus.entry.offerTxHash)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-emerald-600 hover:text-emerald-700 transition-colors"
                >
                  {queueStatus.entry.offerTxHash}
                </a>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ── Status message ────────────────────── */}
      {status && !isProcessing && (
        <div className="glass p-3 text-sm text-[var(--text-secondary)]">
          {status}
        </div>
      )}

      {/* ── Debug: commit hash ────────────────── */}
      {commitHash && queueStatus?.status !== "claimed" && !isProcessing && (
        <div className="p-3 border border-dashed border-black/10 rounded-lg">
          <div className="text-xs text-[var(--text-muted)] break-all">
            <span className="font-semibold">CommitHash:</span> {commitHash}
          </div>
          <div className="text-[10px] text-[var(--text-muted)] opacity-60 mt-1">
            Secret: {secret} · Nonce: {nonce} (stored in localStorage)
          </div>
        </div>
      )}
    </div>
  );
}
