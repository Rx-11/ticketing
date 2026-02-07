// app/marketplace/page.tsx
import Link from "next/link";
import MarketplaceClient from "./MarketplaceClient";

export default function MarketplacePage() {
    return (
        <main style={{ padding: 24, maxWidth: 900 }}>
            <nav style={{ marginBottom: 24 }}>
                <Link href="/" style={{ marginRight: 16 }}>Home</Link>
                <Link href="/my-tickets" style={{ marginRight: 16 }}>My Tickets</Link>
                <Link href="/marketplace" style={{ fontWeight: "bold" }}>Marketplace</Link>
            </nav>

            <h1>Marketplace</h1>
            <p style={{ opacity: 0.8 }}>Buy tickets from other fans. Price ceilings are enforced.</p>

            <hr style={{ margin: "24px 0", borderColor: "#333" }} />

            <MarketplaceClient />
        </main>
    );
}
