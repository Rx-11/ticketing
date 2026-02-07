"use client";

import { useEffect, useMemo, useState } from "react";
import { requiredStakeXrp } from "@/lib/stake";
import { randomHex, sha256Hex } from "@/lib/hash";
import { makeCommitMemo } from "@/lib/xrplMemo";
import * as xrpl from "xrpl";

export default function EventClient({ eventId }: { eventId: string }) {
  const [seed, setSeed] = useState("");
  const [walletAddr, setWalletAddr] = useState("");

  // Helper for explorer links
  const explorerUrl = (type: "tx" | "nft" | "address", id: string) => `https://testnet.xrpl.org/${type === "tx" ? "transactions" : type}/${id}`;

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
      try { await client.disconnect(); } catch { }
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
    }, 3000);
    return () => clearInterval(timer);
  }, [walletAddr, eventId, tierId]);

  // Save secret/nonce to localStorage when generated
  useEffect(() => {
    if (commitHash && secret && nonce && walletAddr) {
      const key = `fen_commit_${eventId}_${tierId}_${walletAddr}`;
      localStorage.setItem(key, JSON.stringify({ secret, nonce, hash: commitHash }));
    }
  }, [commitHash, secret, nonce, walletAddr, eventId, tierId]);

  async function doReveal() {
    if (!secret || !nonce) return setStatus("Missing secret/nonce. Did you clear your cache?");
    setStatus("Revealing and purchasing ticket (processing refund + NFT mint)…");

    try {
      const res = await fetch("/api/queue/reveal", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ eventId, tierId, wallet: walletAddr, secret, nonce }),
      });
      const data = await res.json();
      if (!res.ok) {
        setStatus(`Reveal failed: ${data.error}`);
        return;
      }
      setStatus("✅ Success! Your stake has been refunded and your NFT ticket is being minted.");
    } catch (e: any) {
      setStatus(`Reveal error: ${e.message}`);
    }
  }

  return (
    <>
      <div style={{ display: "grid", gap: 10, maxWidth: 720 }}>
        <h2>1. Identity & Score</h2>
        <label>
          Testnet seed (MVP/dev only):
          <input
            value={seed}
            onChange={(e) => setSeed(e.target.value)}
            placeholder="s████████████..."
            style={{ marginLeft: 8, width: "100%", padding: 8, background: "#111", color: "#fff", border: "1px solid #333" }}
          />
        </label>

        <div>
          <b>Wallet:</b> {walletAddr || <span style={{ opacity: 0.6 }}>—</span>}
        </div>

        <div>
          {loadingScore && <div>Loading score…</div>}
          {!loadingScore && score !== null && (
            <div style={{ padding: 12, border: "1px solid #333", borderRadius: 8, background: "#0a0a0a" }}>
              <div><b>FenScore:</b> {score}</div>
              <div><b>Required stake:</b> {stakeXrp} XRP</div>
            </div>
          )}
        </div>

        {walletAddr && (!queueStatus || queueStatus.status === "not_found") && (
          <>
            <h2>2. Stake & Queue</h2>
            <button onClick={doCommit} style={{ padding: "10px 12px", width: "100%", background: "#0070f3", color: "white", border: "none", borderRadius: 4, cursor: "pointer" }}>
              Commit (stake {stakeXrp} XRP)
            </button>
          </>
        )}

        {queueStatus && queueStatus.status === "committed" && (
          <div style={{ padding: 12, border: "1px solid #0070f3", borderRadius: 8, background: "rgba(0, 112, 243, 0.1)" }}>
            <h2>2. Queue Status</h2>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginTop: 10 }}>
              <div style={{ padding: 10, border: "1px solid #333", borderRadius: 6, background: "#111" }}>
                <div style={{ fontSize: 11, opacity: 0.6 }}>Current Queue Position</div>
                <div style={{ fontSize: 20, fontWeight: "bold" }}>#{queueStatus.absolutePosition}</div>
              </div>
              <div style={{ padding: 10, border: "1px solid #0070f3", borderRadius: 6, background: "rgba(0, 112, 243, 0.1)" }}>
                <div style={{ fontSize: 11, color: "#0070f3" }}>Actual Position (Waiting)</div>
                <div style={{ fontSize: 20, fontWeight: "bold", color: "#0070f3" }}>#{queueStatus.waitingPosition}</div>
              </div>
            </div>

            <div style={{ opacity: 0.8, marginTop: 8 }}>
              You have staked {queueStatus.entry.stakeXrp} XRP. Your commitment is on-ledger.
              {queueStatus.entry.commitTxHash && (
                <div style={{ marginTop: 4 }}>
                  <a href={explorerUrl("tx", queueStatus.entry.commitTxHash)} target="_blank" rel="noopener noreferrer" style={{ color: "#0070f3", fontSize: 12 }}>
                    View Commit Tx on Explorer ↗
                  </a>
                </div>
              )}
            </div>

            <h2 style={{ marginTop: 24 }}>3. Buy Ticket (Reveal)</h2>
            <p style={{ fontSize: 13, opacity: 0.7 }}>
              Ready to buy? This will reveal your secret, refund your {queueStatus.entry.stakeXrp} XRP stake, and mint your NFT ticket.
              <b> You will then need to accept the NFT offer to pay the ticket price.</b>
            </p>

            <button onClick={doReveal} style={{ padding: "10px 12px", width: "100%", background: "#27ae60", color: "white", border: "none", borderRadius: 4, cursor: "pointer" }}>
              Reveal & Buy Ticket
            </button>
          </div>
        )}

        {queueStatus && queueStatus.status === "claimed" && (
          <div style={{ padding: 12, border: "1px solid #27ae60", borderRadius: 8, background: "rgba(39, 174, 96, 0.1)" }}>
            <h2>🎉 Ticket Secured!</h2>
            <p>Your stake has been refunded. Your NFT ticket is minted and a 1 XRP offer has been created for you.</p>
            <div style={{ fontSize: 12, opacity: 0.7, wordBreak: "break-all" }}>
              <b>Refund Tx:</b> <a href={explorerUrl("tx", queueStatus.entry.revealTxHash)} target="_blank" rel="noopener noreferrer" style={{ color: "#27ae60" }}>{queueStatus.entry.revealTxHash}</a><br />
              <b>NFT ID:</b> <a href={explorerUrl("nft", queueStatus.entry.nftId)} target="_blank" rel="noopener noreferrer" style={{ color: "#27ae60" }}>{queueStatus.entry.nftId}</a><br />
              <b>Offer Tx:</b> <a href={explorerUrl("tx", queueStatus.entry.offerTxHash)} target="_blank" rel="noopener noreferrer" style={{ color: "#27ae60" }}>{queueStatus.entry.offerTxHash || "N/A"}</a>
            </div>
          </div>
        )}


        {status && (
          <div style={{ marginTop: 12, padding: 10, background: "#222", borderRadius: 4, fontSize: 14 }}>
            {status}
          </div>
        )}

        {queueStatus && queueStatus.queueList && (
          <div style={{ marginTop: 24, padding: 16, border: "1px solid #333", borderRadius: 8, background: "#050505" }}>
            <h2 style={{ marginTop: 0 }}>4. Live Queue (On-Ledger)</h2>
            <div style={{ display: "grid", gap: 10 }}>
              {queueStatus.queueList.map((q: any, i: number) => {
                const isMe = q.wallet === walletAddr;
                return (
                  <div key={i} style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "8px 12px",
                    background: isMe ? "rgba(0, 112, 243, 0.1)" : "#111",
                    border: isMe ? "1px solid #0070f3" : "1px solid #222",
                    borderRadius: 6
                  }}>
                    <div>
                      <div style={{ fontSize: 13, fontWeight: "bold" }}>
                        #{i + 1} {q.wallet.slice(0, 8)}...{q.wallet.slice(-4)} {isMe && "(You)"}
                      </div>
                      <div style={{ fontSize: 11, opacity: 0.6 }}>
                        Staked at {new Date(q.createdAt).toLocaleTimeString()}
                      </div>
                    </div>
                    <a
                      href={explorerUrl("tx", q.commitTxHash)}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ fontSize: 11, color: "#0070f3", textDecoration: "none" }}
                    >
                      Verify Tx ↗
                    </a>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </>
  );
}

