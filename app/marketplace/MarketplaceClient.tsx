"use client";

import { useEffect, useState } from "react";
import { getEvent, getTier } from "@/lib/events";
import * as xrpl from "xrpl";

export default function MarketplaceClient() {
  const [seed, setSeed] = useState("");
  const [walletAddr, setWalletAddr] = useState("");
  const [offers, setOffers] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");
  const [buying, setBuying] = useState(false);

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

  async function loadOffers() {
    setLoading(true);
    try {
      const res = await fetch("/api/tickets/resale");
      const data = await res.json();
      setOffers(data.offers || []);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadOffers();
  }, []);

  async function handleBuy(offer: any) {
    if (!walletAddr) return alert("Enter your seed first!");

    setBuying(true);
    setStatus(`Purchasing ticket for ${offer.priceXrp} XRP…`);

    const client = new xrpl.Client(xrplWs);
    try {
      await client.connect();
      const wallet = xrpl.Wallet.fromSeed(seed.trim());

      const nftOffers = await client.request({
        command: "nft_sell_offers",
        nft_id: offer.nftId,
      });

      const actualOffer = (nftOffers.result.offers as any[]).find(
        (o) => o.owner === offer.seller
      );
      if (!actualOffer) {
        setStatus("Could not find the sell offer on-ledger.");
        setBuying(false);
        return;
      }

      const acceptOffer: xrpl.NFTokenAcceptOffer = {
        TransactionType: "NFTokenAcceptOffer",
        Account: walletAddr,
        NFTokenSellOffer: actualOffer.nft_offer_index,
      };

      await client.submitAndWait(acceptOffer, { wallet });
      setStatus("✅ Purchase successful! The NFT ticket is now in your wallet.");
      loadOffers();
    } catch (e: any) {
      setStatus(`Error: ${e.message}`);
    } finally {
      setBuying(false);
      await client.disconnect();
    }
  }

  return (
    <div className="space-y-6">
      {/* Seed input */}
      <div className="glass p-5 slide-up">
        <label className="text-xs font-medium text-[var(--text-secondary)] mb-1.5 block">
          Enter your Testnet Seed to buy tickets
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
            Buying as: {walletAddr}
          </div>
        )}
      </div>

      {/* Loading */}
      {loading && (
        <div className="flex items-center gap-2 text-sm text-[var(--text-muted)]">
          <span className="spinner spinner-sm spinner-indigo" />
          Loading resale offers…
        </div>
      )}

      {/* Empty state */}
      {!loading && offers.length === 0 && (
        <div className="glass p-12 text-center slide-up">
          <p className="text-4xl mb-3">🏪</p>
          <p className="text-sm font-medium text-[var(--text-secondary)]">
            No active resale offers found.
          </p>
          <p className="text-xs text-[var(--text-muted)] mt-1">
            Check back later or browse events directly.
          </p>
        </div>
      )}

      {/* Offer grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {offers.map((o, i) => {
          const event = getEvent(o.eventId);
          const tier = getTier(o.eventId, o.tierId);
          return (
            <div
              key={i}
              className="glass p-5 space-y-3 slide-up"
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              <div className="badge badge-mint text-[10px]">RESALE LISTING</div>
              <h3 className="text-base font-bold text-[var(--text-primary)]">
                {event.name}
              </h3>
              <p className="text-sm text-[var(--text-secondary)]">{tier.name}</p>

              <div className="mt-2">
                <span className="text-2xl font-bold text-[var(--text-primary)]">
                  {o.priceXrp} XRP
                </span>
                <span className="text-xs text-[var(--text-muted)] ml-2">
                  retail: {tier.priceXrp} XRP
                </span>
              </div>

              <div className="pt-3 border-t border-black/5">
                <button
                  onClick={() => handleBuy(o)}
                  disabled={buying}
                  className="btn-primary w-full text-sm"
                  style={{
                    background: "linear-gradient(135deg, #059669 0%, #34d399 100%)",
                    boxShadow: "0 2px 8px rgba(5,150,105,0.25)",
                  }}
                >
                  {buying ? (
                    <span className="flex items-center justify-center gap-2">
                      <span className="spinner spinner-sm" />
                      Purchasing…
                    </span>
                  ) : (
                    "Buy Ticket"
                  )}
                </button>
                <div className="text-[10px] text-[var(--text-muted)] text-center mt-2">
                  Seller: {o.seller.slice(0, 10)}…
                </div>
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
