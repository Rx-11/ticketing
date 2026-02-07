"use client";

import { useState } from "react";
import { EventConfig } from "@/lib/events";
import { maxResalePriceXrp } from "@/lib/pricing";
import SplitBar from "@/app/components/SplitBar";
import CountdownTimer from "@/app/components/CountdownTimer";

const TABS = ["Overview", "Tiers", "Splits", "Rules"] as const;
type Tab = (typeof TABS)[number];

export default function EventDetails({ event }: { event: EventConfig }) {
  const [activeTab, setActiveTab] = useState<Tab>("Overview");

  return (
    <div>
      {/* Tab bar */}
      <div className="tab-bar mb-6">
        {TABS.map((tab) => (
          <button
            key={tab}
            className={`tab ${activeTab === tab ? "active" : ""}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Tab content */}
      <div className="fade-in" key={activeTab}>
        {activeTab === "Overview" && <OverviewTab event={event} />}
        {activeTab === "Tiers" && <TiersTab event={event} />}
        {activeTab === "Splits" && <SplitsTab event={event} />}
        {activeTab === "Rules" && <RulesTab event={event} />}
      </div>
    </div>
  );
}

/* ───────── OVERVIEW ───────── */
function OverviewTab({ event }: { event: EventConfig }) {
  const totalSupply = event.tiers.reduce((sum, t) => sum + t.supply, 0);
  const minPrice = Math.min(...event.tiers.map((t) => Number(t.priceXrp)));

  return (
    <div className="space-y-5">
      {/* Countdown */}
      <div className="glass p-5 flex items-center justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)] mb-1">
            Event starts in
          </p>
          <CountdownTimer targetDate={event.startTimeISO} />
        </div>
        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-500/10 to-cyan-400/10 flex items-center justify-center">
          <svg className="w-6 h-6 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
      </div>

      {/* Quick stats */}
      <div className="grid grid-cols-3 gap-3">
        <div className="stat-pill">
          <span className="label">From</span>
          <span className="value">{minPrice} <span className="text-sm font-normal text-[var(--text-muted)]">XRP</span></span>
        </div>
        <div className="stat-pill">
          <span className="label">Total Supply</span>
          <span className="value">{totalSupply}</span>
        </div>
        <div className="stat-pill">
          <span className="label">Tiers</span>
          <span className="value">{event.tiers.length}</span>
        </div>
      </div>

      {/* Quick split preview */}
      <div className="glass p-5">
        <p className="text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)] mb-3">
          Revenue Split (Primary)
        </p>
        <SplitBar splits={event.primarySplits} />
      </div>
    </div>
  );
}

/* ───────── TIERS ───────── */
function TiersTab({ event }: { event: EventConfig }) {
  return (
    <div className="space-y-4">
      {event.tiers.map((tier) => {
        const maxResale = maxResalePriceXrp(tier.priceXrp, tier.resaleCapBps);
        return (
          <div key={tier.tierId} className="glass p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="text-lg font-bold text-[var(--text-primary)]">
                    {tier.name}
                  </h3>
                  <span className="badge badge-neutral text-[10px]">{tier.tierId}</span>
                </div>
                <p className="text-sm text-[var(--text-muted)]">
                  Resale capped at +{tier.resaleCapBps / 100}% above face value
                </p>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-[var(--text-primary)]">
                  {tier.priceXrp}
                  <span className="text-sm font-medium text-[var(--text-muted)] ml-1">XRP</span>
                </p>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div className="bg-black/[0.02] rounded-lg p-3">
                <p className="text-[10px] font-semibold uppercase tracking-wider text-[var(--text-muted)] mb-0.5">Supply</p>
                <p className="text-sm font-bold text-[var(--text-primary)]">{tier.supply} tickets</p>
              </div>
              <div className="bg-black/[0.02] rounded-lg p-3">
                <p className="text-[10px] font-semibold uppercase tracking-wider text-[var(--text-muted)] mb-0.5">Face Value</p>
                <p className="text-sm font-bold text-[var(--text-primary)]">{tier.priceXrp} XRP</p>
              </div>
              <div className="bg-black/[0.02] rounded-lg p-3">
                <p className="text-[10px] font-semibold uppercase tracking-wider text-[var(--text-muted)] mb-0.5">Max Resale</p>
                <p className="text-sm font-bold text-[var(--text-primary)]">{maxResale} XRP</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

/* ───────── SPLITS ───────── */
function SplitsTab({ event }: { event: EventConfig }) {
  return (
    <div className="space-y-6">
      <div className="glass p-6">
        <h3 className="text-base font-bold text-[var(--text-primary)] mb-1">
          Primary Sale Split
        </h3>
        <p className="text-xs text-[var(--text-muted)] mb-4">
          How revenue is distributed when a ticket is first purchased
        </p>
        <SplitBar splits={event.primarySplits} />

        <div className="mt-4 space-y-2">
          {event.primarySplits.map((s) => (
            <div key={s.name} className="flex items-center justify-between text-sm py-2 border-b border-black/[0.03] last:border-0">
              <span className="capitalize text-[var(--text-secondary)]">{s.name}</span>
              <div className="flex items-center gap-3">
                <code className="text-xs text-[var(--text-muted)] bg-black/[0.03] px-2 py-0.5 rounded font-mono">
                  {s.address.slice(0, 8)}…
                </code>
                <span className="font-semibold text-[var(--text-primary)]">
                  {(s.bps / 100).toFixed(1)}%
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="glass p-6">
        <h3 className="text-base font-bold text-[var(--text-primary)] mb-1">
          Resale Fees & Royalties
        </h3>
        <p className="text-xs text-[var(--text-muted)] mb-4">
          Fees deducted on resale — seller receives the remainder
        </p>
        <SplitBar splits={event.resaleSplits} showSeller />

        <div className="mt-4 space-y-2">
          {event.resaleSplits.map((s) => (
            <div key={s.name} className="flex items-center justify-between text-sm py-2 border-b border-black/[0.03] last:border-0">
              <span className="capitalize text-[var(--text-secondary)]">{s.name}</span>
              <span className="font-semibold text-[var(--text-primary)]">
                {(s.bps / 100).toFixed(1)}%
              </span>
            </div>
          ))}
          <div className="flex items-center justify-between text-sm py-2">
            <span className="text-[var(--text-secondary)] font-medium">Seller receives</span>
            <span className="font-bold text-emerald-600">
              {((10000 - event.resaleSplits.reduce((acc, x) => acc + x.bps, 0)) / 100).toFixed(1)}%
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ───────── RULES ───────── */
function RulesTab({ event }: { event: EventConfig }) {
  const rules = event.rules;
  return (
    <div className="glass p-6 space-y-5">
      <div>
        <h3 className="text-base font-bold text-[var(--text-primary)] mb-3">
          Queue Rules
        </h3>
        <p className="text-sm text-[var(--text-muted)] mb-5">
          These parameters govern the commit-reveal queue for fair ticket distribution.
        </p>
      </div>

      <div className="space-y-3">
        {[
          {
            label: "Commit Window",
            value: `${rules.commitWindowSeconds}s`,
            desc: "Time to submit your hashed commitment",
            icon: "🔒",
          },
          {
            label: "Reveal Window",
            value: `${rules.revealWindowSeconds}s`,
            desc: "Time to reveal your secret after commit closes",
            icon: "🔓",
          },
          {
            label: "Resale Lockout",
            value: `${rules.resaleCloseHoursBeforeStart}h before start`,
            desc: "Resale market closes this many hours before the event",
            icon: "⏱",
          },
        ].map((rule) => (
          <div
            key={rule.label}
            className="flex items-start gap-4 p-4 rounded-xl bg-black/[0.02] border border-black/[0.03]"
          >
            <span className="text-xl">{rule.icon}</span>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-[var(--text-primary)]">
                  {rule.label}
                </span>
                <span className="text-sm font-bold text-indigo-600 font-mono">
                  {rule.value}
                </span>
              </div>
              <p className="text-xs text-[var(--text-muted)] mt-0.5">{rule.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
