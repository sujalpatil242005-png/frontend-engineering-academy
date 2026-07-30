/* ============================================================
   db.js — SQLite via better-sqlite3: a single file (fea.db),
   zero external services to set up. Good enough for real usage
   at this app's scale; swap for Postgres later without touching
   any route logic if you outgrow it (just replace this file's
   query calls with an ORM/driver of your choice).

   Two tables:
   - users        — one row per account (email/password and/or
                    OAuth identities)
   - user_state   — one row per user, storing the exact same
                    shape store.js used to keep in localStorage
                    (progress, bookmarks, notes, history, streak,
                    sidebarGroups) as a single JSON blob. This
                    keeps the frontend migration mechanical: the
                    same object shape, just fetched from an API
                    instead of localStorage.
   ============================================================ */

import Database from 'better-sqlite3';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const db = new Database(path.join(__dirname, '..', 'fea.db'));

db.pragma('journal_mode = WAL');

db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT UNIQUE,
    password_hash TEXT,
    name TEXT,
    google_id TEXT UNIQUE,
    github_id TEXT UNIQUE,
    created_at TEXT NOT NULL DEFAULT (datetime('now'))
  );

  CREATE TABLE IF NOT EXISTS user_state (
    user_id INTEGER PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
    state_json TEXT NOT NULL,
    updated_at TEXT NOT NULL DEFAULT (datetime('now'))
  );
`);

export default db;
