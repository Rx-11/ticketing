// app/marketplace/page.tsx
import Link from "next/link";
import MarketplaceClient from "./MarketplaceClient";

export default function MarketplacePage() {
  return (
    <main className="pt-28 pb-20 px-6 max-w-5xl mx-auto relative z-10">
      <div className="slide-up">
        <h1 className="text-3xl font-bold text-[var(--text-primary)]">Marketplace</h1>
        <p className="text-sm text-[var(--text-muted)] mt-1">
          Buy tickets from other fans. Price ceilings are enforced.
        </p>
      </div>

      <hr className="hr-gradient my-8" />

      <MarketplaceClient />
    </main>
  );
}
