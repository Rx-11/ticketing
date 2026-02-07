"use client";

import { useEffect, useState } from "react";
import { getEvent, getTier } from "@/lib/events";
import { maxResalePriceXrp } from "@/lib/pricing";
import * as xrpl from "xrpl";

export default function MyTicketsClient() {
  const [seed, setSeed] = useState("");
  const [walletAddr, setWalletAddr] = useState("");

  const explorerUrl = (type: "tx" | "nft" | "address", id: string) =>
    `https://testnet.xrpl.org/${type === "tx" ? "transactions" : type}/${id}`;

  useEffect(() => {
    const savedSeed = localStorage.getItem("fen_wallet_seed");
    if (savedSeed) setSeed(savedSeed);
  }, []);

  useEffect(() => {
    if (seed) localStorage.setItem("fen_wallet_seed", seed);
  }, [seed]);

  const [tickets, setTickets] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");
  const [reselling, setReselling] = useState(false);

  const xrplWs = process.env.NEXT_PUBLIC_XRPL_WS!;

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

  async function loadTickets() {
    if (!walletAddr) return;
    setLoading(true);
    try {
      const res = await fetch(`/api/tickets/my?wallet=${walletAddr}`);
      const data = await res.json();
      setTickets(data.tickets || []);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadTickets();
  }, [walletAddr]);

  async function handleResale(ticket: any) {
    const requestedPrice = prompt("Enter resale price in XRP:");
    if (!requestedPrice) return;

    const tier = getTier(ticket.eventId, ticket.tierId);
    const maxPrice = maxResalePriceXrp(tier.priceXrp, tier.resaleCapBps);

    if (Number(requestedPrice) > Number(maxPrice)) {
      alert(
        `Price exceeds ceiling! Max allowed: ${maxPrice} XRP (+${tier.resaleCapBps / 100}%).`
      );
      return;
    }

    setReselling(true);
    setStatus(`Creating sell offer for ${requestedPrice} XRP…`);

<<<<<<< HEAD
    const client = new xrpl.Client(xrplWs);
    try {
      await client.connect();
      const wallet = xrpl.Wallet.fromSeed(seed.trim());

      const nftsRes = await client.request({
        command: "account_nfts",
        account: walletAddr,
      });

      const nft = (nftsRes.result.account_nfts as any[]).find(() => true);
=======
    async function handleResale(ticket: any) {
        const event = getEvent(ticket.eventId);
        const tier = getTier(ticket.eventId, ticket.tierId);
        const maxPrice = maxResalePriceXrp(tier.priceXrp, tier.resaleCapBps);

        const requestedPrice = prompt(`Enter resale price in XRP (Max: ${maxPrice} XRP):`);
        if (!requestedPrice) return;

        if (Number(requestedPrice) > Number(maxPrice)) {
            alert(`Price exceeds ceiling! Max allowed: ${maxPrice} XRP (+${tier.resaleCapBps / 100}%).`);
            return;
        }
>>>>>>> main

      if (!nft) {
        setStatus("Could not find NFT on-ledger for this wallet.");
        setReselling(false);
        return;
      }

      const sellOffer: xrpl.NFTokenCreateOffer = {
        TransactionType: "NFTokenCreateOffer",
        Account: walletAddr,
        NFTokenID: nft.NFTokenID,
        Amount: xrpl.xrpToDrops(requestedPrice),
        Flags: xrpl.NFTokenCreateOfferFlags.tfSellNFToken,
      };

<<<<<<< HEAD
      const result = await client.submitAndWait(sellOffer, { wallet });

      await fetch("/api/tickets/resale", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          offerId: (result.result as any).hash,
          nftId: nft.NFTokenID,
          seller: walletAddr,
          priceXrp: requestedPrice,
          eventId: ticket.eventId,
          tierId: ticket.tierId,
        }),
      });

      setStatus("✅ Resale offer created on XRPL!");
    } catch (e: any) {
      setStatus(`Error: ${e.message}`);
    } finally {
      setReselling(false);
      await client.disconnect();
=======
            // 1) Submit the NFTokenCreateOffer on XRPL
            const sellOffer: xrpl.NFTokenCreateOffer = {
                TransactionType: "NFTokenCreateOffer",
                Account: walletAddr,
                NFTokenID: ticket.nftId, // Use the correct ID from our DB
                Amount: xrpl.xrpToDrops(requestedPrice),
                Flags: xrpl.NFTokenCreateOfferFlags.tfSellNFToken,
            };

            const result = await client.submitAndWait(sellOffer, { wallet });

            // Extract the actual Offer Index from metadata
            const affectedNodes = (result.result as any).meta.AffectedNodes;
            let offerIndex = "";
            for (const node of affectedNodes) {
                if (node.CreatedNode?.LedgerEntryType === "NFTokenOffer") {
                    offerIndex = node.CreatedNode.LedgerIndex;
                    break;
                }
            }

            if (!offerIndex) {
                // Fallback if metadata is tricky, but CreatedNode is usually clear
                setStatus("✅ Offer created, but could not extract offer index. Backend may need manual sync.");
            }

            // 2) Save to backend
            const res = await fetch("/api/tickets/resale", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    offerId: (result.result as any).hash,
                    nftId: ticket.nftId,
                    seller: walletAddr,
                    priceXrp: requestedPrice,
                    eventId: ticket.eventId,
                    tierId: ticket.tierId,
                    offerIndex: offerIndex
                }),
            });

            const data = await res.json();
            if (!res.ok) {
                setStatus(`Backend save failed: ${data.error}`);
                return;
            }

            setStatus(`✅ Resale offer created! Tx: ${(result.result as any).hash}`);
        } catch (e: any) {
            setStatus(`Error: ${e.message}`);
        } finally {
            await client.disconnect();
        }
>>>>>>> main
    }
  }

  return (
    <div className="space-y-6">
      {/* Seed input */}
      <div className="glass p-5 slide-up">
        <label className="text-xs font-medium text-[var(--text-secondary)] mb-1.5 block">
          Enter your Testnet Seed to view tickets
        </label>
        <input
          type="password"
          value={seed}
          onChange={(e) => setSeed(e.target.value)}
          placeholder="s████████████..."
          className="input-glass"
        />
        {walletAddr && (
          <div className="text-xs font-mono text-[var(--text-muted)] mt-2 break-all">
            Wallet: {walletAddr}
          </div>
        )}
      </div>

<<<<<<< HEAD
      {/* Loading */}
      {loading && (
        <div className="flex items-center gap-2 text-sm text-[var(--text-muted)]">
          <span className="spinner spinner-sm spinner-indigo" />
          Fetching tickets…
=======
            {loading && <div>Fetching tickets from database…</div>}

            {!loading && tickets.length === 0 && walletAddr && (
                <div style={{ padding: 40, textAlign: "center", border: "1px dashed #333", borderRadius: 8 }}>
                    No tickets found for this wallet.
                </div>
            )}

            <div style={{ display: "grid", gap: 16, gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))" }}>
                {tickets.map((t, i) => {
                    const event = getEvent(t.eventId);
                    const tier = getTier(t.eventId, t.tierId);
                    return (
                        <div key={i} style={{ padding: 16, border: "1px solid #333", borderRadius: 12, background: "#0c0c0c" }}>
                            <div style={{ fontSize: 12, color: "#888", marginBottom: 4 }}>NFT TICKET</div>
                            <h3 style={{ margin: "0 0 8px 0" }}>{event.name}</h3>
                            <div style={{ fontSize: 14, opacity: 0.8 }}>{tier.name}</div>
                            <div style={{ fontSize: 13, marginTop: 8 }}>
                                <b>Venue:</b> {event.venueName}<br />
                                <b>Date:</b> {new Date(event.startTimeISO).toLocaleDateString()}<br />
                                {t.nftId && (
                                    <div style={{ marginTop: 4 }}>
                                        <a href={explorerUrl("nft", t.nftId)} target="_blank" rel="noopener noreferrer" style={{ color: "#0070f3", fontSize: 12 }}>
                                            View NFT on Explorer ↗
                                        </a>
                                    </div>
                                )}
                            </div>

                            <div style={{ marginTop: 16, paddingTop: 16, borderTop: "1px solid #222" }}>
                                <div style={{ fontSize: 11, opacity: 0.6, marginBottom: 8 }}>
                                    Max Resale: {maxResalePriceXrp(tier.priceXrp, tier.resaleCapBps)} XRP
                                </div>
                                <button
                                    onClick={() => handleResale(t)}
                                    style={{ width: "100%", padding: 8, background: "transparent", border: "1px solid #444", color: "#fff", borderRadius: 4, cursor: "pointer" }}
                                >
                                    List for Resale
                                </button>
                            </div>

                        </div>
                    );
                })}
            </div>

            {status && (
                <div style={{ padding: 12, background: "#222", borderRadius: 8, fontSize: 14 }}>
                    {status}
                </div>
            )}
>>>>>>> main
        </div>
      )}

      {/* Empty state */}
      {!loading && tickets.length === 0 && walletAddr && (
        <div className="glass p-12 text-center slide-up">
          <p className="text-4xl mb-3">🎫</p>
          <p className="text-sm font-medium text-[var(--text-secondary)]">
            No tickets found for this wallet.
          </p>
          <p className="text-xs text-[var(--text-muted)] mt-1">
            Purchase a ticket from an event to see it here.
          </p>
        </div>
      )}

      {/* Ticket grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {tickets.map((t, i) => {
          const event = getEvent(t.eventId);
          const tier = getTier(t.eventId, t.tierId);
          return (
            <div
              key={i}
              className="glass p-5 space-y-3 slide-up"
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              <div className="badge badge-mint text-[10px]">NFT TICKET</div>
              <h3 className="text-base font-bold text-[var(--text-primary)]">
                {event.name}
              </h3>
              <p className="text-sm text-[var(--text-secondary)]">{tier.name}</p>

              <div className="text-xs text-[var(--text-muted)] space-y-1">
                <div>
                  <span className="font-semibold">Venue:</span> {event.venueName}
                </div>
                <div>
                  <span className="font-semibold">Date:</span>{" "}
                  {new Date(event.startTimeISO).toLocaleDateString()}
                </div>
                {t.nftId && (
                  <a
                    href={explorerUrl("nft", t.nftId)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-indigo-500 hover:text-indigo-600 font-medium transition-colors inline-block mt-1"
                  >
                    View NFT on Explorer ↗
                  </a>
                )}
              </div>

              <div className="pt-3 border-t border-black/5">
                <button
                  onClick={() => handleResale(t)}
                  disabled={reselling}
                  className="btn-glass w-full text-sm"
                >
                  {reselling ? (
                    <span className="flex items-center justify-center gap-2">
                      <span className="spinner spinner-sm spinner-indigo" />
                      Listing…
                    </span>
                  ) : (
                    "List for Resale"
                  )}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Status */}
      {status && (
        <div className="glass p-3 text-sm text-[var(--text-secondary)]">
          {status}
        </div>
      )}
    </div>
  );
}
