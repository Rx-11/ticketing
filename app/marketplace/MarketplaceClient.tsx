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
  const [buyingId, setBuyingId] = useState<string | null>(null);

  const xrplWs = process.env.NEXT_PUBLIC_XRPL_WS!;

  const explorerUrl = (type: "tx" | "nft" | "address", id: string) =>
    `https://testnet.xrpl.org/${type === "tx" ? "transactions" : type}/${id}`;

  useEffect(() => {
    const savedSeed = localStorage.getItem("fen_wallet_seed");
    if (savedSeed) setSeed(savedSeed);
  }, []);

  useEffect(() => {
    if (seed) localStorage.setItem("fen_wallet_seed", seed);
  }, [seed]);

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

    setBuyingId(offer.offerId);
    setStatus(`Purchasing ticket for ${offer.priceXrp} XRP…`);

    const client = new xrpl.Client(xrplWs);
    try {
      await client.connect();
      const wallet = xrpl.Wallet.fromSeed(seed.trim());

      // 1) Try the stored offerIndex first
      let offerIndexToAccept =
        offer.offerIndex && offer.offerIndex.trim()
          ? offer.offerIndex.trim()
          : null;

      // 2) If no stored offerIndex, look up on-ledger
      if (!offerIndexToAccept) {
        setStatus("Looking up sell offer on-ledger…");
        try {
          const nftOffers = await client.request({
            command: "nft_sell_offers",
            nft_id: offer.nftId,
          });

          const allOffers = nftOffers.result.offers as any[];

          // Find an offer from the seller that is NOT destination-locked
          // (or is destined to us). Skip platform's destination-locked offers
          // meant for someone else.
          let actualOffer = allOffers.find(
            (o) =>
              o.owner === offer.seller &&
              (!o.destination || o.destination === walletAddr)
          );

          // Fallback: any open offer (no destination) for this NFT
          if (!actualOffer) {
            actualOffer = allOffers.find(
              (o) => !o.destination || o.destination === walletAddr
            );
          }

          if (actualOffer) {
            offerIndexToAccept = actualOffer.nft_offer_index;
          }
        } catch (e: any) {
          const errCode = e?.data?.error;
          if (errCode === "object_not_found") {
            setStatus(
              "No sell offers exist for this NFT on-ledger. The seller may not have listed it yet, or it was already purchased."
            );
            setBuyingId(null);
            return;
          }
          console.warn(
            "nft_sell_offers lookup failed:",
            errCode || e?.message
          );
        }
      }

      if (!offerIndexToAccept) {
        setStatus(
          "Could not find a valid sell offer for your wallet. The offer may be locked to another buyer, or already accepted."
        );
        setBuyingId(null);
        return;
      }

      setStatus(
        `Found offer (${offerIndexToAccept.slice(0, 8)}…). Accepting…`
      );

      const acceptOffer: xrpl.NFTokenAcceptOffer = {
        TransactionType: "NFTokenAcceptOffer",
        Account: walletAddr,
        NFTokenSellOffer: offerIndexToAccept,
      };

      const result = await client.submitAndWait(acceptOffer, { wallet });
      const meta = (result.result as any).meta;

      if (meta?.TransactionResult !== "tesSUCCESS") {
        setStatus(`Transaction failed: ${meta?.TransactionResult}`);
        setBuyingId(null);
        return;
      }

      const txHash = (result.result as any).hash;
      setStatus(`✅ Purchase successful! Tx: ${txHash}`);
      loadOffers();
    } catch (e: any) {
      setStatus(`Error: ${e.message}`);
    } finally {
      setBuyingId(null);
      try {
        await client.disconnect();
      } catch {}
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
          const isBuyingThis = buyingId === o.offerId;
          return (
            <div
              key={o.offerId || i}
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
                  disabled={buyingId !== null}
                  className="btn-primary w-full text-sm"
                  style={{
                    background:
                      "linear-gradient(135deg, #059669 0%, #34d399 100%)",
                    boxShadow: "0 2px 8px rgba(5,150,105,0.25)",
                  }}
                >
                  {isBuyingThis ? (
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
