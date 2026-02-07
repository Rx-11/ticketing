"use client";

import { useEffect, useMemo, useState } from "react";
import { requiredStakeXrp } from "@/lib/stake";
import { randomHex, sha256Hex } from "@/lib/hash";
import { makeCommitMemo } from "@/lib/xrplMemo";
import * as xrpl from "xrpl";

export default function EventClient({ eventId }: { eventId: string }) {
  const [seed, setSeed] = useState("");
  const [walletAddr, setWalletAddr] = useState("");
  const [quantity, setQuantity] = useState(1);

  const explorerUrl = (type: "tx" | "nft" | "address", id: string) =>
    `https://testnet.xrpl.org/${type === "tx" ? "transactions" : type}/${id}`;

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
  const [accepting, setAccepting] = useState(false);

  const xrplWs = process.env.NEXT_PUBLIC_XRPL_WS!;
  const platformAddr = process.env.NEXT_PUBLIC_PLATFORM_RECEIVE_ADDRESS!;

  const tierId = "GA";

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

  async function loadScore() {
    if (!walletAddr) {
      setScore(null);
      return;
    }
    setLoadingScore(true);
    try {
      const res = await fetch(
        `/api/score?wallet=${encodeURIComponent(walletAddr)}`
      );
      const data = await res.json();
      setScore(data.score ?? 0);
    } finally {
      setLoadingScore(false);
    }
  }

  useEffect(() => {
    loadScore();
  }, [walletAddr]);

  const stakeXrp = useMemo(
    () => (score === null ? null : requiredStakeXrp(score)),
    [score]
  );

  const totalStake = useMemo(
    () => (stakeXrp ? (Number(stakeXrp) * quantity).toFixed(2).replace(/\.?0+$/, "") : null),
    [stakeXrp, quantity]
  );

  async function doCommit() {
    if (!seed.trim()) return setStatus("Enter a seed (testnet) to commit.");
    if (!walletAddr) return setStatus("Invalid seed.");
    if (!stakeXrp || !totalStake) return setStatus("Score not loaded yet.");
    if (!platformAddr?.startsWith("r"))
      return setStatus("Set NEXT_PUBLIC_PLATFORM_RECEIVE_ADDRESS.");

    setCommitting(true);

    const client = new xrpl.Client(xrplWs);
    try {
      await client.connect();
      const wallet = xrpl.Wallet.fromSeed(seed.trim());

      for (let i = 0; i < quantity; i++) {
        setStatus(`Preparing commit ${i + 1} of ${quantity}…`);

        const sec = randomHex(16);
        const non = randomHex(16);
        const commitInput = `${eventId}|${tierId}|${walletAddr}|${sec}|${non}`;
        const cHash = await sha256Hex(commitInput);

        const memo = makeCommitMemo(eventId, tierId, cHash);

        const tx: xrpl.Payment = {
          TransactionType: "Payment",
          Account: wallet.classicAddress,
          Destination: platformAddr,
          Amount: xrpl.xrpToDrops(stakeXrp),
          Memos: [memo],
        };

        setStatus(`Submitting stake ${i + 1}/${quantity} to XRPL…`);
        const result = await client.submitAndWait(tx, { wallet });

        const txHash =
          (result.result as any)?.hash ||
          (result.result as any)?.tx_json?.hash;

        if (!txHash) {
          setStatus(`Ticket ${i + 1}: couldn't read tx hash.`);
          continue;
        }

        // Save to backend
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
            ticketIndex: i,
          }),
        });

        if (!saveRes.ok) {
          const err = await saveRes.json();
          setStatus(`Ticket ${i + 1} save failed: ${err.error}`);
          continue;
        }

        // Save secret/nonce for this specific commit
        const key = `fen_commit_${eventId}_${tierId}_${walletAddr}_${cHash}`;
        localStorage.setItem(key, JSON.stringify({ secret: sec, nonce: non, hash: cHash }));

        // Keep the latest for reveal
        setSecret(sec);
        setNonce(non);
        setCommitHash(cHash);
      }

      setStatus(`✅ ${quantity} ticket(s) committed — stakes paid, on-chain.`);
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
    const poll = async () => {
      try {
        const res = await fetch(
          `/api/queue/status?eventId=${eventId}&tierId=${tierId}&wallet=${walletAddr}`
        );
        const data = await res.json();
        setQueueStatus(data);

        // Restore latest committed entry's secret/nonce
        if (data.entry && data.status === "committed") {
          const key = `fen_commit_${eventId}_${tierId}_${walletAddr}_${data.entry.commitHash}`;
          const saved = localStorage.getItem(key);
          if (saved) {
            const { secret: s, nonce: n, hash: h } = JSON.parse(saved);
            setSecret(s);
            setNonce(n);
            setCommitHash(h);
          }
        }
      } catch (e) {
        console.error("Queue poll error", e);
      }
    };
    poll();
    const timer = setInterval(poll, 3000);
    return () => clearInterval(timer);
  }, [walletAddr, eventId, tierId]);

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
      // Refresh score after purchase
      loadScore();
      setStatus(
        "✅ Reveal success! Now accept the sell offer to receive your NFT ticket."
      );
    } catch (e: any) {
      setStatus(`Reveal error: ${e.message}`);
    } finally {
      setRevealing(false);
    }
  }

  async function doAcceptOffer() {
    if (!seed.trim() || !walletAddr) return setStatus("Enter your seed.");
    if (!queueStatus?.entry?.nftId) return setStatus("NFT ID not found.");

    setAccepting(true);
    setStatus("Looking for your sell offer on-ledger…");

    const client = new xrpl.Client(xrplWs);
    try {
      await client.connect();
      const wallet = xrpl.Wallet.fromSeed(seed.trim());

      const nftOffers = await client.request({
        command: "nft_sell_offers",
        nft_id: queueStatus.entry.nftId,
      });

      const myOffer = (nftOffers.result.offers as any[]).find(
        (o) =>
          o.destination === walletAddr || o.owner === platformAddr
      );

      if (!myOffer) {
        setStatus(
          "Could not find the sell offer on-ledger. Try again in a few seconds."
        );
        setAccepting(false);
        return;
      }

      setStatus(
        `Found offer for ${xrpl.dropsToXrp(myOffer.amount)} XRP. Accepting…`
      );

      const acceptTx: xrpl.NFTokenAcceptOffer = {
        TransactionType: "NFTokenAcceptOffer",
        Account: walletAddr,
        NFTokenSellOffer: myOffer.nft_offer_index,
      };

      const result = await client.submitAndWait(acceptTx, { wallet });
      const meta = (result.result as any).meta;

      if (meta?.TransactionResult !== "tesSUCCESS") {
        setStatus(`Accept failed: ${meta?.TransactionResult}`);
        setAccepting(false);
        return;
      }

      setStatus("✅ NFT ticket is now in your wallet!");
    } catch (e: any) {
      if (e?.data?.error === "object_not_found") {
        setStatus("No sell offers found yet — try again in a few seconds.");
      } else {
        setStatus(`Accept error: ${e?.message || String(e)}`);
      }
    } finally {
      setAccepting(false);
      try {
        await client.disconnect();
      } catch {}
    }
  }

  const isProcessing = committing || revealing || accepting;

  // Count how many are committed vs claimed
  const committedCount = queueStatus?.myEntries?.filter((e: any) => e.status === "committed").length ?? 0;
  const claimedCount = queueStatus?.myEntries?.filter((e: any) => e.status === "claimed").length ?? 0;
  const totalTickets = queueStatus?.myEntries?.length ?? 0;

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
              <span className="label">Trust Score</span>
              <span className="value">{score}</span>
            </div>
            <div className="stat-pill flex-1">
              <span className="label">Stake / Ticket</span>
              <span className="value">{stakeXrp} XRP</span>
            </div>
          </div>
        )}
      </div>

      {/* ── Step 2: Commit / Queue ────────────── */}
      {walletAddr && (!queueStatus || queueStatus.status === "not_found" || claimedCount === totalTickets) && (
        <div className="glass p-5 space-y-4 slide-up">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-[var(--text-muted)]">
            2 · Stake &amp; Queue
          </h3>

          {/* Quantity selector */}
          <div>
            <label className="text-xs font-medium text-[var(--text-secondary)] mb-1.5 block">
              Number of tickets
            </label>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                disabled={isProcessing || quantity <= 1}
                className="btn-glass w-10 h-10 flex items-center justify-center text-lg font-bold"
              >
                −
              </button>
              <span className="text-xl font-bold text-[var(--text-primary)] w-8 text-center">
                {quantity}
              </span>
              <button
                onClick={() => setQuantity(Math.min(5, quantity + 1))}
                disabled={isProcessing || quantity >= 5}
                className="btn-glass w-10 h-10 flex items-center justify-center text-lg font-bold"
              >
                +
              </button>
              {quantity > 1 && totalStake && (
                <span className="text-xs text-[var(--text-muted)] ml-2">
                  Total stake: {totalStake} XRP
                </span>
              )}
            </div>
          </div>

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
              Commit {quantity} ticket{quantity > 1 ? "s" : ""} — Stake {totalStake} XRP
            </button>
          )}
        </div>
      )}

      {/* ── Committed state: queue position + reveal ── */}
      {queueStatus && queueStatus.status === "committed" && committedCount > 0 && (
        <div
          className="glass p-5 space-y-4 slide-up"
          style={{ borderColor: "rgba(99,102,241,0.25)" }}
        >
          <h3 className="text-sm font-semibold uppercase tracking-wider text-[var(--text-muted)]">
            2 · Queue Status
          </h3>

          <div className="grid grid-cols-3 gap-3">
            <div className="stat-pill">
              <span className="label">Position</span>
              <span className="value">#{queueStatus.absolutePosition}</span>
            </div>
            <div className="stat-pill" style={{ borderColor: "rgba(99,102,241,0.2)" }}>
              <span className="label" style={{ color: "#6366f1" }}>Waiting</span>
              <span className="value" style={{ color: "#6366f1" }}>#{queueStatus.waitingPosition}</span>
            </div>
            <div className="stat-pill">
              <span className="label">Committed</span>
              <span className="value">{committedCount} ticket{committedCount > 1 ? "s" : ""}</span>
            </div>
          </div>

          <p className="text-xs text-[var(--text-secondary)]">
            Staked {queueStatus.entry.stakeXrp} XRP per ticket — commitments are on-ledger.
          </p>

          {queueStatus.entry.commitTxHash && (
            <a
              href={explorerUrl("tx", queueStatus.entry.commitTxHash)}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-medium text-indigo-500 hover:text-indigo-600 transition-colors"
            >
              View Latest Commit Tx ↗
            </a>
          )}

          <div className="pt-4 border-t border-black/5 space-y-3">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-[var(--text-muted)]">
              3 · Buy Ticket (Reveal)
            </h3>
            <p className="text-xs text-[var(--text-secondary)]">
              Reveals one ticket at a time. Refunds stake and mints your NFT.
              <strong> You&apos;ll then accept the offer to pay.</strong>
            </p>

            {revealing ? (
              <div className="processing-overlay">
                <span className="spinner spinner-mint" style={{ width: 40, height: 40, borderWidth: 3 }} />
                <div>
                  <p className="text-sm font-semibold text-[var(--text-primary)]">
                    Minting your NFT ticket…
                  </p>
                  <p className="text-xs text-[var(--text-muted)] mt-1">{status}</p>
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
                Reveal &amp; Buy 1 Ticket
              </button>
            )}
          </div>
        </div>
      )}

      {/* ── Claimed state: accept offer ─── */}
      {queueStatus && claimedCount > 0 && queueStatus.entry?.nftId && (
        <div
          className="glass p-5 space-y-4 slide-up"
          style={{ borderColor: "rgba(52,211,153,0.3)" }}
        >
          <div className="flex items-center gap-2">
            <span className="text-2xl">🎉</span>
            <h3 className="text-lg font-bold text-[var(--text-primary)]">
              {claimedCount} Ticket{claimedCount > 1 ? "s" : ""} Secured!
            </h3>
          </div>
          <p className="text-sm text-[var(--text-secondary)]">
            Your stake has been refunded and your NFT ticket has been minted.
            Accept the sell offer to transfer the NFT to your wallet.
          </p>

          <div className="pt-3 border-t border-black/5 space-y-3">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-[var(--text-muted)]">
              4 · Accept NFT Offer &amp; Pay
            </h3>

            {accepting ? (
              <div className="processing-overlay">
                <span className="spinner" style={{ width: 40, height: 40, borderWidth: 3 }} />
                <div>
                  <p className="text-sm font-semibold text-[var(--text-primary)]">
                    Accepting offer on XRPL…
                  </p>
                  <p className="text-xs text-[var(--text-muted)] mt-1">{status}</p>
                </div>
              </div>
            ) : (
              <button
                onClick={doAcceptOffer}
                disabled={isProcessing}
                className="btn-primary w-full"
                style={{ background: "linear-gradient(135deg, #6366f1 0%, #818cf8 100%)" }}
              >
                Accept Offer &amp; Pay Ticket Price
              </button>
            )}
          </div>

          <div className="space-y-2 text-xs text-[var(--text-muted)] break-all">
            {queueStatus.entry.revealTxHash && (
              <div>
                <span className="font-semibold text-[var(--text-secondary)]">Refund Tx: </span>
                <a href={explorerUrl("tx", queueStatus.entry.revealTxHash)} target="_blank" rel="noopener noreferrer" className="text-emerald-600 hover:text-emerald-700 transition-colors">
                  {queueStatus.entry.revealTxHash}
                </a>
              </div>
            )}
            {queueStatus.entry.nftId && (
              <div>
                <span className="font-semibold text-[var(--text-secondary)]">NFT ID: </span>
                <a href={explorerUrl("nft", queueStatus.entry.nftId)} target="_blank" rel="noopener noreferrer" className="text-emerald-600 hover:text-emerald-700 transition-colors">
                  {queueStatus.entry.nftId}
                </a>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ── Live Queue ────────────────────────── */}
      {queueStatus && queueStatus.queueList && queueStatus.queueList.length > 0 && (
        <div className="glass p-5 space-y-4 slide-up">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-[var(--text-muted)]">
            Live Queue (On-Ledger)
          </h3>
          <div className="space-y-2">
            {queueStatus.queueList.map((q: any, i: number) => {
              const isMe = q.wallet === walletAddr;
              return (
                <div
                  key={i}
                  className={`flex items-center justify-between p-3 rounded-xl text-sm ${
                    isMe
                      ? "bg-[var(--accent-primary-soft)] border border-indigo-300/30"
                      : "bg-black/[0.02] border border-black/[0.03]"
                  }`}
                >
                  <div>
                    <span className="font-bold text-[var(--text-primary)]">#{i + 1}</span>{" "}
                    <span className="font-mono text-xs text-[var(--text-muted)]">
                      {q.wallet.slice(0, 8)}…{q.wallet.slice(-4)}
                    </span>
                    {isMe && <span className="badge badge-indigo text-[9px] ml-2">You</span>}
                    <div className="text-[10px] text-[var(--text-muted)] mt-0.5">
                      {new Date(q.createdAt).toLocaleTimeString()}
                      {q.status !== "committed" && (
                        <span className="badge badge-mint text-[9px] ml-2">{q.status}</span>
                      )}
                    </div>
                  </div>
                  <a
                    href={explorerUrl("tx", q.commitTxHash)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[11px] font-medium text-indigo-500 hover:text-indigo-600 transition-colors"
                  >
                    Verify ↗
                  </a>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Status */}
      {status && !isProcessing && (
        <div className="glass p-3 text-sm text-[var(--text-secondary)]">{status}</div>
      )}

      {/* Debug */}
      {commitHash && queueStatus?.status !== "claimed" && !isProcessing && (
        <div className="p-3 border border-dashed border-black/10 rounded-lg">
          <div className="text-xs text-[var(--text-muted)] break-all">
            <span className="font-semibold">CommitHash:</span> {commitHash}
          </div>
          <div className="text-[10px] text-[var(--text-muted)] opacity-60 mt-1">
            Secret: {secret} · Nonce: {nonce}
          </div>
        </div>
      )}
    </div>
  );
}

