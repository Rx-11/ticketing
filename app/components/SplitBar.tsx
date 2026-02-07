"use client";

import { Split } from "@/lib/events";

const COLORS: Record<string, string> = {
  artist: "bg-indigo-400",
  venue: "bg-cyan-400",
  platform: "bg-emerald-400",
  seller: "bg-amber-300",
};

const DOT_COLORS: Record<string, string> = {
  artist: "bg-indigo-400",
  venue: "bg-cyan-400",
  platform: "bg-emerald-400",
  seller: "bg-amber-300",
};

export default function SplitBar({
  splits,
  showSeller = false,
}: {
  splits: Split[];
  showSeller?: boolean;
}) {
  const totalBps = splits.reduce((sum, s) => sum + s.bps, 0);
  const sellerBps = showSeller ? 10_000 - totalBps : 0;

  const allSegments = [
    ...splits.map((s) => ({ name: s.name, bps: s.bps })),
    ...(showSeller && sellerBps > 0 ? [{ name: "seller", bps: sellerBps }] : []),
  ];

  return (
    <div>
      {/* Bar */}
      <div className="split-bar">
        {allSegments.map((seg) => (
          <div
            key={seg.name}
            className={`${COLORS[seg.name] || "bg-gray-300"}`}
            style={{ width: `${(seg.bps / 10_000) * 100}%` }}
          />
        ))}
      </div>

      {/* Legend */}
      <div className="flex flex-wrap gap-x-5 gap-y-1 mt-3">
        {allSegments.map((seg) => (
          <div key={seg.name} className="flex items-center gap-1.5">
            <span className={`w-2 h-2 rounded-full ${DOT_COLORS[seg.name] || "bg-gray-300"}`} />
            <span className="text-xs text-[var(--text-secondary)] capitalize">{seg.name}</span>
            <span className="text-xs font-semibold text-[var(--text-primary)]">
              {(seg.bps / 100).toFixed(1)}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
