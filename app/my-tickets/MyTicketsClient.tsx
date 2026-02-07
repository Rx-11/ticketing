"use client";

import { useEffect, useState } from "react";
import { getEvent, getTier } from "@/lib/events";
import { maxResalePriceXrp } from "@/lib/pricing";
import * as xrpl from "xrpl";

export default function MyTicketsClient() {
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

    const [tickets, setTickets] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState("");

    const xrplWs = process.env.NEXT_PUBLIC_XRPL_WS!;

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

        const event = getEvent(ticket.eventId);
        const tier = getTier(ticket.eventId, ticket.tierId);
        const maxPrice = maxResalePriceXrp(tier.priceXrp, tier.resaleCapBps);

        if (Number(requestedPrice) > Number(maxPrice)) {
            alert(`Price exceeds ceiling! Max allowed: ${maxPrice} XRP (+${tier.resaleCapBps / 100}%).`);
            return;
        }

        setStatus(`Creating sell offer for ${requestedPrice} XRP…`);

        const client = new xrpl.Client(xrplWs);
        try {
            await client.connect();
            const wallet = xrpl.Wallet.fromSeed(seed.trim());

            // Find the NFTokenID on-ledger
            // In a real app, we'd have the NFTokenID stored. 
            // For MVP, we can try to find it in the user's account_nfts.
            const nftsRes = await client.request({
                command: "account_nfts",
                account: walletAddr,
            });

            const nft = (nftsRes.result.account_nfts as any[]).find(n => {
                // Match by some metadata if possible, or just take the first one for the demo
                return true;
            });

            if (!nft) {
                setStatus("Could not find NFT on-ledger for this wallet.");
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

            // Save to backend
            await fetch("/api/tickets/resale", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    offerId: (result.result as any).hash, // Use tx hash as proxy for offer ID for MVP
                    nftId: nft.NFTokenID,
                    seller: walletAddr,
                    priceXrp: requestedPrice,
                    eventId: ticket.eventId,
                    tierId: ticket.tierId,
                }),
            });

            setStatus("✅ Resale offer created on XRPL! Others can now buy this ticket via the platform.");
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
                    Enter your Testnet Seed to view tickets:
                    <input
                        type="password"
                        value={seed}
                        onChange={(e) => setSeed(e.target.value)}
                        placeholder="s████████████..."
                        style={{ width: "100%", padding: 12, marginTop: 8, background: "#111", color: "#fff", border: "1px solid #333" }}
                    />
                </label>
                {walletAddr && <div style={{ marginTop: 8, fontSize: 13, opacity: 0.7 }}>Wallet: {walletAddr}</div>}
            </div>

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
        </div>
    );
}
