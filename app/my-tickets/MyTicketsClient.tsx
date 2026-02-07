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

    const client = new xrpl.Client(xrplWs);
    try {
      await client.connect();
      const wallet = xrpl.Wallet.fromSeed(seed.trim());

      const nftsRes = await client.request({
        command: "account_nfts",
        account: walletAddr,
      });

      const nft = (nftsRes.result.account_nfts as any[]).find(() => true);

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

      {/* Loading */}
      {loading && (
        <div className="flex items-center gap-2 text-sm text-[var(--text-muted)]">
          <span className="spinner spinner-sm spinner-indigo" />
          Fetching tickets…
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
