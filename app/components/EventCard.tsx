"use client";

import Link from "next/link";
import { EventConfig } from "@/lib/events";
import CountdownTimer from "./CountdownTimer";

export default function EventCard({
  event,
  index = 0,
}: {
  event: EventConfig;
  index?: number;
}) {
  const startDate = new Date(event.startTimeISO);
  const minPrice = Math.min(...event.tiers.map((t) => Number(t.priceXrp)));
  const totalSupply = event.tiers.reduce((sum, t) => sum + t.supply, 0);

  return (
    <Link
      href={`/event/${event.eventId}`}
      className={`block group slide-up slide-up-delay-${Math.min(index, 4)}`}
    >
      <div className="glass p-0 h-full flex flex-col overflow-hidden group-hover:translate-y-[-3px]">
        {/* Top accent bar */}
        <div className="h-1 w-full bg-gradient-to-r from-indigo-400 via-cyan-300 to-mint-300 opacity-60 group-hover:opacity-100 transition-opacity" />

        <div className="p-6 flex flex-col gap-4 flex-1">
          {/* Header row */}
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-2">
              <span className="badge badge-indigo">{event.currency}</span>
              <span className="badge badge-neutral text-[10px]">
                {event.tiers.length} tier{event.tiers.length !== 1 ? "s" : ""}
              </span>
            </div>
            <CountdownTimer targetDate={event.startTimeISO} />
          </div>

          {/* Event info */}
          <div className="flex-1">
            <h3 className="text-lg font-bold text-[var(--text-primary)] mb-1.5 group-hover:text-indigo-600 transition-colors leading-tight">
              {event.name}
            </h3>
            <div className="flex flex-col gap-1">
              <p className="text-sm text-[var(--text-secondary)] flex items-center gap-2">
                <svg className="w-3.5 h-3.5 text-[var(--text-muted)] flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                {event.venueName}
              </p>
              <p className="text-sm text-[var(--text-muted)] flex items-center gap-2">
                <svg className="w-3.5 h-3.5 text-[var(--text-muted)] flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                {startDate.toLocaleDateString("en-US", {
                  weekday: "short",
                  month: "short",
                  day: "numeric",
                })}
                {" · "}
                {startDate.toLocaleTimeString("en-US", {
                  hour: "numeric",
                  minute: "2-digit",
                })}
              </p>
            </div>
          </div>

          {/* Bottom stats */}
          <div className="flex items-end justify-between pt-4 border-t border-black/[0.04]">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-wider text-[var(--text-muted)] mb-0.5">
                Starting from
              </p>
              <p className="text-2xl font-bold text-[var(--text-primary)] leading-none">
                {minPrice}
                <span className="text-sm font-medium text-[var(--text-muted)] ml-1">XRP</span>
              </p>
            </div>
            <div className="text-right">
              <p className="text-[10px] font-semibold uppercase tracking-wider text-[var(--text-muted)] mb-0.5">
                Available
              </p>
              <p className="text-lg font-bold text-[var(--text-primary)] leading-none">
                {totalSupply}
                <span className="text-xs font-medium text-[var(--text-muted)] ml-1">tickets</span>
              </p>
            </div>
          </div>
        </div>

        {/* Hover gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-100/0 to-cyan-100/0 group-hover:from-indigo-50/30 group-hover:to-cyan-50/20 transition-all duration-500 pointer-events-none rounded-[var(--radius-md)]" />
      </div>
    </Link>
  );
}
