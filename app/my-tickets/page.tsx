// app/my-tickets/page.tsx
import Link from "next/link";
import MyTicketsClient from "./MyTicketsClient";

export default function MyTicketsPage() {
    return (
        <main style={{ padding: 24, maxWidth: 900 }}>
            <nav style={{ marginBottom: 24 }}>
                <Link href="/" style={{ marginRight: 16 }}>Home</Link>
                <Link href="/my-tickets" style={{ fontWeight: "bold" }}>My Tickets</Link>
            </nav>

            <h1>My Tickets</h1>
            <p style={{ opacity: 0.8 }}>View and manage your NFT event tickets.</p>

            <hr style={{ margin: "24px 0", borderColor: "#333" }} />

            <MyTicketsClient />
        </main>
    );
}
