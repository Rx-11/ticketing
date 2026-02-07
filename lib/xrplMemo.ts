// lib/xrplMemo.ts
export function utf8ToHex(str: string): string {
  return Buffer.from(str, "utf8").toString("hex").toUpperCase();
}

export function makeCommitMemo(eventId: string, tierId: string, commitHash: string) {
  // Keep it short. XRPL memos are hex strings.
  const memoString = `COMMIT|${eventId}|${tierId}|${commitHash}`;
  return {
    Memo: {
      MemoType: utf8ToHex("FEN"),
      MemoData: utf8ToHex(memoString),
    },
  };
}
