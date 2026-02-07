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

    const xrplWs = process.env.NEXT_PUBLIC_XRPL_WS!;

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
        setStatus(`Purchasing ticket for ${offer.priceXrp} XRP…`);

        const client = new xrpl.Client(xrplWs);
        try {
            await client.connect();
            const wallet = xrpl.Wallet.fromSeed(seed.trim());

            let offerIndexToAccept = offer.offerIndex;

            // If offerIndex is missing in DB, try to find it on-ledger as fallback
            if (!offerIndexToAccept) {
                const nftOffers = await client.request({
                    command: "nft_sell_offers",
                    nft_id: offer.nftId,
                });
                const actualOffer = (nftOffers.result.offers as any[]).find(o => o.owner === offer.seller);
                if (!actualOffer) {
                    setStatus("Could not find the sell offer on-ledger.");
                    return;
                }
                offerIndexToAccept = actualOffer.nft_offer_index;
            }

            const acceptOffer: xrpl.NFTokenAcceptOffer = {
                TransactionType: "NFTokenAcceptOffer",
                Account: walletAddr,
                NFTokenSellOffer: offerIndexToAccept,
            };

            const result = await client.submitAndWait(acceptOffer, { wallet });
            const txHash = (result.result as any).hash;

            setStatus(`✅ Purchase successful! Tx: ${txHash}`);
            loadOffers(); // Refresh
        } catch (e: any) {
            setStatus(`Error: ${e.message}`);
        } finally {
            await client.disconnect();
        }
    }

    return (
        <div style={{ display: "grid", gap: 20 }}>
            <div>
                <label>
                    Enter your Testnet Seed to buy tickets:
                    <input
                        type="password"
                        value={seed}
                        onChange={(e) => setSeed(e.target.value)}
                        placeholder="s████████████..."
                        style={{ width: "100%", padding: 12, marginTop: 8, background: "#111", color: "#fff", border: "1px solid #333" }}
                    />
                </label>
                {walletAddr && <div style={{ marginTop: 8, fontSize: 13, opacity: 0.7 }}>Buying as: {walletAddr}</div>}
            </div>

            {loading && <div>Loading active resale offers…</div>}

            {!loading && offers.length === 0 && (
                <div style={{ padding: 40, textAlign: "center", border: "1px dashed #333", borderRadius: 8 }}>
                    No active resale offers found.
                </div>
            )}

            <div style={{ display: "grid", gap: 16, gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))" }}>
                {offers.map((o, i) => {
                    const event = getEvent(o.eventId);
                    const tier = getTier(o.eventId, o.tierId);
                    return (
                        <div key={i} style={{ padding: 16, border: "1px solid #333", borderRadius: 12, background: "#0c0c0c" }}>
                            <div style={{ fontSize: 12, color: "#27ae60", marginBottom: 4, fontWeight: "bold" }}>RESALE LISTING</div>
                            <h3 style={{ margin: "0 0 8px 0" }}>{event.name}</h3>
                            <div style={{ fontSize: 14, opacity: 0.8 }}>{tier.name}</div>

                            <div style={{ marginTop: 16, fontSize: 24, fontWeight: "bold", color: "#fff" }}>
                                {o.priceXrp} XRP
                            </div>
                            <div style={{ fontSize: 12, opacity: 0.6 }}>
                                Retail price: {tier.priceXrp} XRP
                            </div>

                            <div style={{ marginTop: 16, paddingTop: 16, borderTop: "1px solid #222" }}>
                                <button
                                    onClick={() => handleBuy(o)}
                                    style={{ width: "100%", padding: 10, background: "#27ae60", border: "none", color: "#fff", borderRadius: 4, cursor: "pointer", fontWeight: "bold" }}
                                >
                                    Buy Ticket
                                </button>
                                <div style={{ fontSize: 11, opacity: 0.5, marginTop: 8, textAlign: "center" }}>
                                    Seller: {o.seller.slice(0, 10)}...
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            {status && (
                <div style={{ padding: 12, background: "#222", borderRadius: 8, fontSize: 14 }}>
                    {status.includes("Tx:") ? (
                        <>
                            {status.split("Tx:")[0]}
                            <a href={explorerUrl("tx", status.split("Tx:")[1].trim())} target="_blank" rel="noopener noreferrer" style={{ color: "#27ae60" }}>
                                View on Explorer ↗
                            </a>
                        </>
                    ) : status}
                </div>
            )}

        </div>
    );
}
