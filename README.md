# Frontend Engineering Academy — with backend + auth

Two projects:
- `fea-react/` — the app you already had (Vite + React)
- `fea-backend/` — new: Node + Express + SQLite, handling signup/login/OAuth and syncing progress/bookmarks/notes per account

## Run both locally

**Backend:**
```
cd fea-backend
cp .env.example .env
npm install
npm start
```
Runs on http://localhost:4000. Uses a local SQLite file (`fea.db`) — no external database to set up.

**Frontend:**
```
cd fea-react
cp .env.example .env
npm install
npm run dev
```
Runs on http://localhost:5173 and talks to the backend at the URL in `VITE_API_URL`.

With both running: open the frontend, sign up with an email/password, and you're in — progress/bookmarks/notes now live on the backend instead of just localStorage.

## Verified before delivery
- Backend: `npm install` succeeds; manually tested end-to-end with curl — signup, login, `/me`, unauthenticated requests correctly rejected with 401, and state correctly persists across a PUT then GET.
- Frontend: `npm install && npm run build` succeeds (86 modules, no errors) with the new auth pages, context, and store changes wired in.
- I do **not** have a way to click through a live browser in this environment, so the actual login-form-to-dashboard flow, and the Google/GitHub buttons specifically, haven't been visually confirmed — see the checklist below.

## Email + password
Works out of the box, no setup needed — this is what I could fully verify end-to-end above.

## Google / GitHub login — needs your own credentials
I can't generate real OAuth credentials for you (they're tied to your own Google/GitHub developer accounts), so these are wired up and ready, but inactive until you add credentials:

### Google
1. Go to https://console.cloud.google.com/apis/credentials
2. Create a project (or use an existing one) → **Create Credentials → OAuth client ID → Web application**
3. Authorized redirect URI: `http://localhost:4000/api/auth/google/callback`
4. Copy the Client ID and Client Secret into `fea-backend/.env`:
   ```
   GOOGLE_CLIENT_ID=...
   GOOGLE_CLIENT_SECRET=...
   ```
5. Restart the backend.

### GitHub
1. Go to https://github.com/settings/developers → **New OAuth App**
2. Homepage URL: `http://localhost:5173`
3. Authorization callback URL: `http://localhost:4000/api/auth/github/callback`
4. Copy the Client ID and Client Secret into `fea-backend/.env`:
   ```
   GITHUB_CLIENT_ID=...
   GITHUB_CLIENT_SECRET=...
   ```
5. Restart the backend.

Until these are set, the Google/GitHub buttons on the login page will show a clear "not configured yet" error instead of crashing — email/password keeps working either way.

## What changed architecturally
- **`store.js`** (frontend) kept its exact same public API (`toggleLessonComplete`, `toggleBookmark`, `setNote`, etc.) — every existing component that used it needed zero changes. Under the hood, `commit()` now also fires a debounced `PUT /api/state` once a user is logged in, and `loadRemoteState()` overwrites local state with the server's copy right after login. LocalStorage stays as an instant local echo so the UI never waits on network round trips.
- **New `AuthContext`** (`src/auth/AuthContext.jsx`) manages the session: token storage, login/signup/logout, and the OAuth redirect handoff.
- **`ProtectedRoute`** wraps the whole app shell — everything except `/login`, `/signup`, and `/auth/callback` requires a session.
- **Backend** uses SQLite via `better-sqlite3` (one file, `fea.db`) — no external database service to sign up for. Swap for Postgres/MySQL later by only touching `fea-backend/src/db/`; none of the route logic would need to change.
- **State storage shape** on the backend is identical to what `store.js` used to keep in localStorage (one JSON blob per user) — this is what made the migration mechanical rather than a rewrite.

## Manual test checklist (since I can't click through this myself)
1. Start both servers.
2. Sign up with a new email/password → should land on the dashboard.
3. Complete a lesson, bookmark another, add a note.
4. Log out, log back in with the same account → progress/bookmark/note should still be there (proves backend sync, not just localStorage).
5. Open the same account in a different browser (or incognito) → should see the same progress (proves it's really server-side, not per-browser).
6. If you set up Google/GitHub credentials: try both login buttons end-to-end.
7. Try visiting a lesson URL directly while logged out → should redirect to `/login`.

## Deploying
- **Backend**: any Node host (Render, Railway, Fly.io, a VPS). SQLite's file needs persistent disk — most of those platforms support a persistent volume; if not, swap to a hosted Postgres.
- **Frontend**: same static hosts as before (Vercel, Netlify, GitHub Pages) — just make sure `VITE_API_URL` in production points at your deployed backend's real URL, and set `FRONTEND_URL`/`BACKEND_URL` in the backend's `.env` to the real deployed URLs too (OAuth callback URLs need updating in the Google/GitHub consoles as well).
