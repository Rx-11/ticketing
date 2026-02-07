// lib/xrplMemo.ts
export function utf8ToHex(str: string): string {
  const encoder = new TextEncoder();
  const bytes = encoder.encode(str);
  return Array.from(bytes)
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("")
    .toUpperCase();
}

export function makeCommitMemo(eventId: string, tierId: string, commitHash: string) {
  const memoString = `COMMIT|${eventId}|${tierId}|${commitHash}`;
  return {
    Memo: {
      MemoType: utf8ToHex("FEN"),
      MemoData: utf8ToHex(memoString),
    },
  };
}
