"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="glass-nav fixed top-0 left-0 right-0 z-50">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-cyan-400 flex items-center justify-center shadow-sm group-hover:shadow-md transition-shadow">
            <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
            </svg>
          </div>
          <span className="text-xl font-bold tracking-tight text-[var(--text-primary)]">
            fen
          </span>
          <span className="badge badge-indigo text-[10px] -ml-1">BETA</span>
        </Link>

        {/* Nav links */}
        <div className="flex items-center gap-8">
          <Link
            href="/"
            className={`text-sm font-medium transition-colors duration-200 ${
              pathname === "/"
                ? "text-[var(--text-primary)]"
                : "text-[var(--text-muted)] hover:text-[var(--text-secondary)]"
            }`}
          >
            Home
          </Link>
          <Link
            href="/events"
            className={`text-sm font-medium transition-colors duration-200 ${
              pathname === "/events" || pathname.startsWith("/event/")
                ? "text-[var(--text-primary)]"
                : "text-[var(--text-muted)] hover:text-[var(--text-secondary)]"
            }`}
          >
            Events
          </Link>
          <Link
            href="/my-tickets"
            className={`text-sm font-medium transition-colors duration-200 ${
              pathname === "/my-tickets"
                ? "text-[var(--text-primary)]"
                : "text-[var(--text-muted)] hover:text-[var(--text-secondary)]"
            }`}
          >
            My Tickets
          </Link>
          <Link
            href="/marketplace"
            className={`text-sm font-medium transition-colors duration-200 ${
              pathname === "/marketplace"
                ? "text-[var(--text-primary)]"
                : "text-[var(--text-muted)] hover:text-[var(--text-secondary)]"
            }`}
          >
            Marketplace
          </Link>
          <div className="h-4 w-px bg-black/5" />
          <div className="badge badge-cyan text-[10px]">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 mr-1.5 animate-pulse" />
            XRPL Testnet
          </div>
        </div>
      </div>
    </nav>
  );
}
