import { EVENTS } from "@/lib/events";
import EventCard from "../components/EventCard";

export default function EventsPage() {
  return (
    <main className="min-h-screen">
      <section className="px-6 pt-12 pb-24 max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8 slide-up">
          <div>
            <h1 className="text-3xl font-extrabold text-[var(--text-primary)]">
              Upcoming Events
            </h1>
            <p className="text-sm text-[var(--text-muted)] mt-1">
              Browse and secure your spot
            </p>
          </div>
          <div className="badge badge-neutral">
            {EVENTS.length} event{EVENTS.length !== 1 ? "s" : ""}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {EVENTS.map((event, i) => (
            <EventCard key={event.eventId} event={event} index={i + 1} />
          ))}
        </div>
      </section>
    </main>
  );
}
