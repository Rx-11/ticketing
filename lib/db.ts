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
    offerIndex TEXT -- The XRPL NFTokenOffer index
  );
`);

// Support migration for existing DBs
try {
    const columns = db.prepare("PRAGMA table_info(offers)").all();
    const hasOfferIndex = (columns as any[]).some(c => c.name === "offerIndex");
    if (!hasOfferIndex) {
        console.log("[DB] Adding offerIndex column to offers table...");
        db.exec("ALTER TABLE offers ADD COLUMN offerIndex TEXT;");
    }
} catch (e) {
    console.error("[DB] Migration error:", e);
}

export const fenDb = {
    queue: {
        find: (predicate: (q: any) => boolean) => {
            const stmt = db.prepare("SELECT * FROM queue");
            const rows = stmt.all();
            return rows.find(predicate);
        },
        filter: (predicate: (q: any) => boolean) => {
            const stmt = db.prepare("SELECT * FROM queue");
            const rows = stmt.all();
            return rows.filter(predicate);
        },
        push: (entry: any) => {
            const stmt = db.prepare(`
        INSERT INTO queue (eventId, tierId, wallet, stakeXrp, commitHash, commitTxHash, createdAt, status)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
      `);
            stmt.run(
                entry.eventId,
                entry.tierId,
                entry.wallet,
                entry.stakeXrp,
                entry.commitHash,
                entry.commitTxHash,
                entry.createdAt,
                entry.status
            );
        },
        update: (wallet: string, updates: any) => {
            const keys = Object.keys(updates);
            const setClause = keys.map(k => `${k} = ?`).join(", ");
            const stmt = db.prepare(`UPDATE queue SET ${setClause} WHERE wallet = ?`);
            stmt.run(...Object.values(updates), wallet);
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
            const stmt = db.prepare("SELECT * FROM offers");
            const rows = stmt.all();
            return rows.find(predicate);
        }
    }
};
