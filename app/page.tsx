import Link from "next/link";
import { EVENTS } from "@/lib/events";

export default function Home() {
  return (
    <main style={{ padding: 24 }}>
      <nav style={{ marginBottom: 24 }}>
        <Link href="/" style={{ marginRight: 16 }}>Home</Link>
        <Link href="/my-tickets">My Tickets</Link>
      </nav>
      <h1>Fen Ticketing (MVP)</h1>
      <p>Hardcoded events:</p>
      <ul>
        {EVENTS.map(e => (
          <li key={e.eventId} style={{ marginBottom: 12 }}>
            <div><b>{e.name}</b> ({e.eventId})</div>
            <div>{e.venueName} • {new Date(e.startTimeISO).toLocaleString()}</div>
            <Link href={`/event/${e.eventId}`}>View event</Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
