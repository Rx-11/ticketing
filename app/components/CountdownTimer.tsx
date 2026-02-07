"use client";

import { useEffect, useState } from "react";

function getTimeRemaining(targetDate: string) {
  const diff = new Date(targetDate).getTime() - Date.now();
  if (diff <= 0) return null;

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);

  return { days, hours, minutes, seconds, total: diff };
}

export default function CountdownTimer({ targetDate }: { targetDate: string }) {
  const [time, setTime] = useState(getTimeRemaining(targetDate));

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(getTimeRemaining(targetDate));
    }, 1000);
    return () => clearInterval(interval);
  }, [targetDate]);

  if (!time) {
    return (
      <span className="badge badge-warning">Live Now</span>
    );
  }

  return (
    <div className="flex items-center gap-1.5">
      {time.days > 0 && (
        <div className="flex flex-col items-center">
          <span className="text-sm font-bold text-[var(--text-primary)] font-mono">{time.days}</span>
          <span className="text-[9px] uppercase tracking-wider text-[var(--text-muted)]">day{time.days !== 1 ? "s" : ""}</span>
        </div>
      )}
      {time.days > 0 && <span className="text-[var(--text-muted)] text-xs mx-0.5">:</span>}
      <div className="flex flex-col items-center">
        <span className="text-sm font-bold text-[var(--text-primary)] font-mono">
          {String(time.hours).padStart(2, "0")}
        </span>
        <span className="text-[9px] uppercase tracking-wider text-[var(--text-muted)]">hrs</span>
      </div>
      <span className="text-[var(--text-muted)] text-xs mx-0.5">:</span>
      <div className="flex flex-col items-center">
        <span className="text-sm font-bold text-[var(--text-primary)] font-mono">
          {String(time.minutes).padStart(2, "0")}
        </span>
        <span className="text-[9px] uppercase tracking-wider text-[var(--text-muted)]">min</span>
      </div>
      <span className="text-[var(--text-muted)] text-xs mx-0.5">:</span>
      <div className="flex flex-col items-center">
        <span className="text-sm font-bold text-[var(--text-primary)] font-mono">
          {String(time.seconds).padStart(2, "0")}
        </span>
        <span className="text-[9px] uppercase tracking-wider text-[var(--text-muted)]">sec</span>
      </div>
    </div>
  );
}
