import Link from "next/link";
import { EVENTS } from "@/lib/events";
import EventCard from "./components/EventCard";
import GlitchText from "./components/GlitchText";

export default function LandingPage() {
  return (
    <main className="min-h-screen">
      {/* SECTION 1 — HERO */}
      <section className="relative overflow-hidden px-6 pt-24 pb-32 min-h-[92vh] flex items-center">
        <div className="hero-orb hero-orb-1" aria-hidden="true" />
        <div className="hero-orb hero-orb-2" aria-hidden="true" />
        <div className="hero-orb hero-orb-3" aria-hidden="true" />

        <div className="max-w-6xl mx-auto w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="slide-up">
              <div className="flex items-center gap-2 mb-6">
                <span className="badge badge-indigo">Fair Ticketing Protocol</span>
                <span className="badge badge-cyan">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 mr-1.5 animate-pulse" />
                  Live on XRPL Testnet
                </span>
              </div>

              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-[var(--text-primary)] leading-[1.05] tracking-tight mb-6">
                The future
                <br />
                of{" "}
                <GlitchText
                  text="ticketing"
                  className="text-5xl sm:text-6xl lg:text-7xl font-extrabold"
                />
                <br />
                <span className="bg-gradient-to-r from-indigo-600 via-cyan-500 to-emerald-500 bg-clip-text text-transparent">
                  is on-chain.
                </span>
              </h1>

              <p className="text-lg sm:text-xl text-[var(--text-secondary)] max-w-lg leading-relaxed mb-8">
                Commit-reveal queues eliminate bots. Transparent revenue splits
                pay artists instantly. Capped resale protects fans.
              </p>

              <div className="flex flex-wrap items-center gap-4">
                <Link href="/events" className="btn-primary text-base px-8 py-3.5">
                  Browse Events
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </Link>
                <a href="#how-it-works" className="btn-glass text-base px-6 py-3.5">
                  How it works
                </a>
              </div>
            </div>

            <div className="slide-up slide-up-delay-2 hidden lg:block">
              <div className="relative">
                <div className="absolute -top-6 -right-6 w-full h-full glass opacity-40 rotate-3" />
                <div className="absolute -top-3 -right-3 w-full h-full glass opacity-60 rotate-1.5" />
                <div className="glass-strong p-8 relative z-10">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-cyan-400 flex items-center justify-center">
                        <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)]">Fen Ticket</p>
                        <p className="text-sm font-bold text-[var(--text-primary)]">#4827</p>
                      </div>
                    </div>
                    <span className="badge badge-mint">Verified</span>
                  </div>
                  <div className="border-t-2 border-dashed border-black/[0.06] my-5 relative">
                    <div className="absolute -left-12 -top-3.5 w-7 h-7 rounded-full bg-[var(--background)]" />
                    <div className="absolute -right-12 -top-3.5 w-7 h-7 rounded-full bg-[var(--background)]" />
                  </div>
                  <div className="space-y-4">
                    <div>
                      <p className="text-xs text-[var(--text-muted)] uppercase tracking-wider font-semibold">Event</p>
                      <p className="text-lg font-bold text-[var(--text-primary)]">Stadium Rock Night</p>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-xs text-[var(--text-muted)] uppercase tracking-wider font-semibold">Venue</p>
                        <p className="text-sm font-semibold text-[var(--text-primary)]">Fen Arena</p>
                      </div>
                      <div>
                        <p className="text-xs text-[var(--text-muted)] uppercase tracking-wider font-semibold">Tier</p>
                        <p className="text-sm font-semibold text-[var(--text-primary)]">General Admission</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-xs text-[var(--text-muted)] uppercase tracking-wider font-semibold">Price</p>
                        <p className="text-xl font-bold text-indigo-600">50 XRP</p>
                      </div>
                      <div>
                        <p className="text-xs text-[var(--text-muted)] uppercase tracking-wider font-semibold">Status</p>
                        <div className="flex items-center gap-1.5 mt-0.5">
                          <span className="w-2 h-2 rounded-full bg-emerald-400" />
                          <span className="text-sm font-semibold text-emerald-600">Committed</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2 — TRUST TICKER */}
      <section className="py-8 border-y border-black/[0.04]">
        <div className="marquee-container">
          <div className="ticker-track">
            {[...Array(2)].map((_, setIdx) => (
              <div key={setIdx} className="flex items-center gap-12 px-6">
                {["No bots","Cryptographic fairness","Instant artist payouts","Capped resale prices","On-chain transparency","XRPL-powered","Commit-reveal protocol","Revenue splits built-in"].map((text) => (
                  <span key={`${setIdx}-${text}`} className="text-sm font-medium text-[var(--text-muted)] whitespace-nowrap flex items-center gap-2">
                    <span className="w-1 h-1 rounded-full bg-indigo-400" />
                    {text}
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 3 — PROBLEM */}
      <section className="px-6 py-24 max-w-6xl mx-auto">
        <div className="text-center mb-16 slide-up">
          <span className="badge badge-neutral mb-4">The Problem</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[var(--text-primary)] tracking-tight mb-4">Ticketing is broken</h2>
          <p className="text-lg text-[var(--text-secondary)] max-w-2xl mx-auto leading-relaxed">Bots snipe tickets in milliseconds. Scalpers flip them at 10×. Artists see none of the resale revenue. Fans lose every time.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { icon: <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>, title: "Bot Sniping", desc: "Automated scripts purchase tickets within milliseconds of going on sale, leaving real fans empty-handed.", color: "text-red-500 bg-red-50 border-red-100" },
            { icon: <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>, title: "Uncapped Resale", desc: "No price controls means tickets get flipped at 5-10× face value. The value goes to scalpers, not creators.", color: "text-amber-600 bg-amber-50 border-amber-100" },
            { icon: <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" /></svg>, title: "Zero Transparency", desc: "Revenue splits are hidden behind closed doors. Artists can't verify payouts. Fans can't verify authenticity.", color: "text-rose-500 bg-rose-50 border-rose-100" },
          ].map((item) => (
            <div key={item.title} className="glass p-6 flex flex-col gap-4 slide-up">
              <div className={`w-12 h-12 rounded-xl ${item.color} border flex items-center justify-center`}>{item.icon}</div>
              <h3 className="text-lg font-bold text-[var(--text-primary)]">{item.title}</h3>
              <p className="text-sm text-[var(--text-secondary)] leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <hr className="hr-gradient max-w-2xl mx-auto" />

      {/* SECTION 4 — HOW IT WORKS */}
      <section id="how-it-works" className="px-6 py-24 max-w-6xl mx-auto scroll-mt-20">
        <div className="text-center mb-16 slide-up">
          <span className="badge badge-indigo mb-4">The Solution</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[var(--text-primary)] tracking-tight mb-4">How Fen works</h2>
          <p className="text-lg text-[var(--text-secondary)] max-w-2xl mx-auto leading-relaxed">A three-phase commit-reveal protocol built on the XRP Ledger that ensures every ticket sale is fair, transparent, and bot-resistant.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-0 md:gap-0">
          {[
            { step: "01", title: "Commit", desc: "Hash your wallet address with a secret nonce. Stake XRP on-chain as your commitment. Your position is cryptographically locked.", color: "from-indigo-500 to-indigo-400", iconColor: "bg-indigo-50 border-indigo-100", icon: <svg className="w-6 h-6 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg> },
            { step: "02", title: "Reveal", desc: "When the reveal window opens, submit your secret. The protocol verifies your hash matches on-chain — any mismatch is rejected.", color: "from-cyan-500 to-cyan-400", iconColor: "bg-cyan-50 border-cyan-100", icon: <svg className="w-6 h-6 text-cyan-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z" /></svg> },
            { step: "03", title: "Receive", desc: "Winners are selected. Revenue splits pay artist, venue & platform instantly on-ledger. Resale is capped and enforced.", color: "from-emerald-500 to-emerald-400", iconColor: "bg-emerald-50 border-emerald-100", icon: <svg className="w-6 h-6 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" /></svg> },
          ].map((item, i) => (
            <div key={item.step} className="relative slide-up" style={{ animationDelay: `${i * 0.15}s` }}>
              {i < 2 && <div className="hidden md:block absolute top-14 right-0 w-full h-[2px] bg-gradient-to-r from-black/[0.03] via-black/[0.06] to-black/[0.03] z-0 translate-x-1/2" />}
              <div className="glass p-8 relative z-10 text-center h-full flex flex-col items-center">
                <div className={`w-14 h-14 rounded-2xl ${item.iconColor} border flex items-center justify-center mb-5 relative`}>
                  {item.icon}
                  <div className={`absolute -top-2 -right-2 w-6 h-6 rounded-full bg-gradient-to-br ${item.color} flex items-center justify-center`}>
                    <span className="text-white text-[10px] font-bold">{item.step}</span>
                  </div>
                </div>
                <h3 className="text-xl font-bold text-[var(--text-primary)] mb-3">{item.title}</h3>
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <hr className="hr-gradient max-w-2xl mx-auto" />

      {/* SECTION 5 — FEATURES */}
      <section className="px-6 py-24 max-w-6xl mx-auto">
        <div className="text-center mb-16 slide-up">
          <span className="badge badge-cyan mb-4">Features</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[var(--text-primary)] tracking-tight mb-4">Built different</h2>
          <p className="text-lg text-[var(--text-secondary)] max-w-2xl mx-auto leading-relaxed">Every feature designed to restore fairness to live events.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {[
            { icon: "🤖", title: "Anti-Bot Queue", desc: "Commit-reveal scheme makes it impossible for bots to gain an advantage. Everyone enters fairly." },
            { icon: "💰", title: "Instant Splits", desc: "Revenue is distributed to artist, venue & platform the moment a ticket sells. Fully on-ledger." },
            { icon: "📊", title: "Capped Resale", desc: "Maximum resale price is enforced on-chain. No 10× markups — fans pay fair prices." },
            { icon: "🔐", title: "Cryptographic Proof", desc: "Every ticket purchase is verified by SHA-256 hash commitment. Tamper-proof by design." },
            { icon: "⚡", title: "XRPL Speed", desc: "3-5 second settlement. Near-zero fees. Energy-efficient consensus — no mining required." },
            { icon: "👁️", title: "Full Transparency", desc: "Every transaction, split & transfer is publicly verifiable on the XRP Ledger." },
          ].map((feature, i) => (
            <div key={feature.title} className={`glass p-6 slide-up stagger-${i + 1}`}>
              <span className="text-2xl mb-3 block">{feature.icon}</span>
              <h3 className="text-base font-bold text-[var(--text-primary)] mb-2">{feature.title}</h3>
              <p className="text-sm text-[var(--text-secondary)] leading-relaxed">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <hr className="hr-gradient max-w-2xl mx-auto" />

      {/* SECTION 6 — STATS */}
      <section className="px-6 py-24 max-w-4xl mx-auto">
        <div className="glass-strong p-10 slide-up">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { value: "3-5s", label: "Settlement" },
              { value: "<$0.01", label: "Tx Fee" },
              { value: "100%", label: "On-Chain" },
              { value: `${EVENTS.length}`, label: "Live Events" },
            ].map((stat) => (
              <div key={stat.label}>
                <p className="text-3xl sm:text-4xl font-extrabold text-[var(--text-primary)] mb-1">{stat.value}</p>
                <p className="text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)]">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <hr className="hr-gradient max-w-2xl mx-auto" />

      {/* SECTION 7 — LIVE EVENTS */}
      <section className="px-6 py-24 max-w-6xl mx-auto">
        <div className="flex items-end justify-between mb-10 slide-up">
          <div>
            <span className="badge badge-mint mb-3">Live Now</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[var(--text-primary)] tracking-tight">Upcoming events</h2>
          </div>
          <Link href="/events" className="btn-glass text-sm hidden sm:inline-flex">
            View all
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {EVENTS.slice(0, 4).map((event, i) => (
            <EventCard key={event.eventId} event={event} index={i + 1} />
          ))}
        </div>
        <div className="mt-8 text-center sm:hidden slide-up">
          <Link href="/events" className="btn-primary">View All Events</Link>
        </div>
      </section>

      <hr className="hr-gradient max-w-2xl mx-auto" />

      {/* SECTION 8 — CTA */}
      <section className="px-6 py-24 max-w-4xl mx-auto">
        <div className="glass-strong p-12 text-center relative overflow-hidden slide-up">
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-100/30 via-transparent to-cyan-100/20 pointer-events-none" />
          <div className="relative z-10">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[var(--text-primary)] tracking-tight mb-4">Ready to experience<br />fair ticketing?</h2>
            <p className="text-lg text-[var(--text-secondary)] max-w-lg mx-auto leading-relaxed mb-8">Join the waitlist or explore upcoming events on the XRPL Testnet. No bots. No scalpers. Just fans.</p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link href="/events" className="btn-primary text-base px-8 py-3.5">
                Explore Events
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
              </Link>
              <a href="https://xrpl.org" target="_blank" rel="noopener noreferrer" className="btn-glass text-base px-6 py-3.5">
                Learn about XRPL
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="px-6 pb-10 pt-4 max-w-6xl mx-auto">
        <div className="border-t border-black/[0.04] pt-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[var(--text-muted)]">
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 rounded-md bg-gradient-to-br from-indigo-500 to-cyan-400 flex items-center justify-center">
                <svg className="w-3 h-3 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
                </svg>
              </div>
              <span className="font-semibold text-[var(--text-secondary)]">fen</span>
              <span className="text-[var(--text-muted)]">• Built at TartanHacks 2026</span>
            </div>
            <div className="flex items-center gap-4">
              <span>XRPL Testnet</span>
              <span>•</span>
              <span>Next.js</span>
              <span>•</span>
              <span>{new Date().getFullYear()}</span>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
