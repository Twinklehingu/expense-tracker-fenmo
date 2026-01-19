const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("./expenses.db");

db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS expenses (
      id TEXT PRIMARY KEY,
      client_request_id TEXT UNIQUE,
      amount_cents INTEGER NOT NULL,
      category TEXT NOT NULL,
      description TEXT,
      date TEXT NOT NULL,
      created_at TEXT NOT NULL
    )
  `);
});

module.exports = db;
