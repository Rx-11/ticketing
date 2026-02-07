// app/event/[eventId]/page.tsx
import { getEvent } from "@/lib/events";
import EventClient from "./EventClient";

export default async function Page({
  params,
}: {
  params: Promise<{ eventId: string }>;
}) {
  const { eventId } = await params;
  const event = getEvent(eventId);

  return (
    <main style={{ padding: 24, maxWidth: 900 }}>
      <h1>{event.name}</h1>
      <div style={{ opacity: 0.8 }}>
        {event.venueName} • {new Date(event.startTimeISO).toLocaleString()}
      </div>

      <hr style={{ margin: "16px 0" }} />

      {/* Client-side interactive block */}
      <EventClient eventId={event.eventId} />

      <hr style={{ margin: "16px 0" }} />

      <h2>Ticket tiers</h2>
      <ul>
        {event.tiers.map((t) => (
          <li key={t.tierId} style={{ marginBottom: 10 }}>
            <b>{t.name}</b> ({t.tierId}) — {t.priceXrp} XRP — supply {t.supply} — resale cap{" "}
            {t.resaleCapBps / 100}%.
          </li>
        ))}
      </ul>

      <hr style={{ margin: "16px 0" }} />

      <h2>Splits</h2>
      <div style={{ display: "flex", gap: 24, flexWrap: "wrap" }}>
        <div>
          <h3 style={{ marginBottom: 6 }}>Primary</h3>
          <ul>
            {event.primarySplits.map((s) => (
              <li key={s.name}>
                {s.name}: {(s.bps / 100).toFixed(2)}% ({s.address})
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 style={{ marginBottom: 6 }}>Resale fees/royalty</h3>
          <ul>
            {event.resaleSplits.map((s) => (
              <li key={s.name}>
                {s.name}: {(s.bps / 100).toFixed(2)}% ({s.address})
              </li>
            ))}
            <li>
              seller:{" "}
              {(
                (10000 - event.resaleSplits.reduce((acc, x) => acc + x.bps, 0)) / 100
              ).toFixed(2)}
              %
            </li>
          </ul>
        </div>
      </div>
    </main>
  );
}
