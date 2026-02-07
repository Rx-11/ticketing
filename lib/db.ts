import Database from "better-sqlite3";
import path from "path";

const dbPath = path.resolve(process.cwd(), "fen.db");
const db = new Database(dbPath);

// Initialize tables
db.exec(`
  CREATE TABLE IF NOT EXISTS queue (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    eventId TEXT NOT NULL,
    tierId TEXT NOT NULL,
    wallet TEXT NOT NULL,
    stakeXrp TEXT NOT NULL,
    commitHash TEXT NOT NULL,
    commitTxHash TEXT NOT NULL,
    createdAt INTEGER NOT NULL,
    revealSecret TEXT,
    revealNonce TEXT,
    revealTxHash TEXT,
    nftId TEXT,
    offerTxHash TEXT,
    status TEXT NOT NULL CHECK(status IN ('committed', 'claimed'))
  );

  CREATE TABLE IF NOT EXISTS offers (
    offerId TEXT PRIMARY KEY,
    nftId TEXT NOT NULL,
    seller TEXT NOT NULL,
    priceXrp TEXT NOT NULL,
    eventId TEXT NOT NULL,
    tierId TEXT NOT NULL,
    offerIndex TEXT
  );

  CREATE TABLE IF NOT EXISTS scores (
    wallet TEXT PRIMARY KEY,
    score INTEGER NOT NULL DEFAULT 0
  );
`);

// Support migration for existing DBs
try {
    const columns = db.prepare("PRAGMA table_info(offers)").all();
    const hasOfferIndex = (columns as any[]).some(c => c.name === "offerIndex");
    if (!hasOfferIndex) {
        db.exec("ALTER TABLE offers ADD COLUMN offerIndex TEXT;");
    }
} catch (e) {
    console.error("[DB] Migration error:", e);
}

export const fenDb = {
    queue: {
        find: (predicate: (q: any) => boolean) => {
            const rows = db.prepare("SELECT * FROM queue").all();
            return rows.find(predicate);
        },
        filter: (predicate: (q: any) => boolean) => {
            const rows = db.prepare("SELECT * FROM queue").all();
            return rows.filter(predicate);
        },
        push: (entry: any) => {
            const stmt = db.prepare(`
                INSERT INTO queue (eventId, tierId, wallet, stakeXrp, commitHash, commitTxHash, createdAt, status)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?)
            `);
            const result = stmt.run(
                entry.eventId,
                entry.tierId,
                entry.wallet,
                entry.stakeXrp,
                entry.commitHash,
                entry.commitTxHash,
                entry.createdAt,
                entry.status
            );
            return result.lastInsertRowid;
        },
        updateById: (id: number, updates: any) => {
            const keys = Object.keys(updates);
            const setClause = keys.map(k => `${k} = ?`).join(", ");
            const stmt = db.prepare(`UPDATE queue SET ${setClause} WHERE id = ?`);
            stmt.run(...Object.values(updates), id);
        },
        getAll: () => db.prepare("SELECT * FROM queue ORDER BY createdAt ASC").all()
    },
    offers: {
        push: (offer: any) => {
            const stmt = db.prepare(`
                INSERT INTO offers (offerId, nftId, seller, priceXrp, eventId, tierId, offerIndex)
                VALUES (?, ?, ?, ?, ?, ?, ?)
            `);
            stmt.run(offer.offerId, offer.nftId, offer.seller, offer.priceXrp, offer.eventId, offer.tierId, offer.offerIndex);
        },
        getAll: () => db.prepare("SELECT * FROM offers").all(),
        find: (predicate: (o: any) => boolean) => {
            const rows = db.prepare("SELECT * FROM offers").all();
            return rows.find(predicate);
        }
    },
    scores: {
        get: (wallet: string): number => {
            const row = db.prepare("SELECT score FROM scores WHERE wallet = ?").get(wallet) as any;
            return row ? row.score : 0;
        },
        increment: (wallet: string, delta: number) => {
            const current = fenDb.scores.get(wallet);
            const newScore = Math.max(0, Math.min(100, current + delta));
            db.prepare(
                "INSERT INTO scores (wallet, score) VALUES (?, ?) ON CONFLICT(wallet) DO UPDATE SET score = ?"
            ).run(wallet, newScore, newScore);
            return newScore;
        },
    }
};
