// app/event/[eventId]/page.tsx
import { getEvent } from "@/lib/events";
import EventClient from "./EventClient";
import EventDetails from "./EventDetails";
import Link from "next/link";

export default async function Page({
  params,
}: {
  params: Promise<{ eventId: string }>;
}) {
  const { eventId } = await params;
  const event = getEvent(eventId);

  return (
    <main className="min-h-screen px-6 py-10 max-w-5xl mx-auto">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-[var(--text-muted)] mb-8 slide-up">
        <Link href="/events" className="hover:text-[var(--text-secondary)] transition-colors">
          Events
        </Link>
        <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
        <span className="text-[var(--text-secondary)] font-medium truncate">{event.name}</span>
      </div>

      {/* Event header */}
      <div className="glass-strong p-8 mb-8 slide-up slide-up-delay-1">
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-6">
          <div className="flex-1">
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <span className="badge badge-indigo">{event.currency}</span>
              <span className="badge badge-neutral">{event.eventId}</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-[var(--text-primary)] leading-tight tracking-tight mb-2">
              {event.name}
            </h1>
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-5 text-sm text-[var(--text-secondary)]">
              <span className="flex items-center gap-1.5">
                <svg className="w-4 h-4 text-[var(--text-muted)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                {event.venueName}
              </span>
              <span className="flex items-center gap-1.5">
                <svg className="w-4 h-4 text-[var(--text-muted)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                {new Date(event.startTimeISO).toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric" })}
                {" at "}
                {new Date(event.startTimeISO).toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" })}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Details + Commit */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        <div className="lg:col-span-3 slide-up slide-up-delay-2">
          <EventDetails event={event} />
        </div>
        <div className="lg:col-span-2 slide-up slide-up-delay-3">
          <EventClient eventId={event.eventId} />
        </div>
      </div>
    </main>
  );
}
