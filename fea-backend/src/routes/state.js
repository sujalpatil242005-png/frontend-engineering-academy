import express from 'express';
import db from '../db/db.js';
import { defaultState } from '../db/defaultState.js';
import { requireAuth } from '../middleware/auth.js';

const router = express.Router();

router.get('/', requireAuth, (req, res) => {
  const row = db.prepare('SELECT state_json FROM user_state WHERE user_id = ?').get(req.userId);
  if (!row) {
    const fresh = defaultState();
    db.prepare('INSERT INTO user_state (user_id, state_json) VALUES (?, ?)').run(req.userId, JSON.stringify(fresh));
    return res.json(fresh);
  }
  res.json(JSON.parse(row.state_json));
});

// Full-state overwrite. The frontend store still holds the
// authoritative object in memory (same shape as before) and just
// PUTs the whole thing here on every commit(), debounced — the
// simplest possible sync strategy, and plenty fast at this scale.
router.put('/', requireAuth, (req, res) => {
  const state = req.body;
  if (!state || typeof state !== 'object') return res.status(400).json({ error: 'Invalid state payload' });

  db.prepare(`
    INSERT INTO user_state (user_id, state_json, updated_at)
    VALUES (?, ?, datetime('now'))
    ON CONFLICT(user_id) DO UPDATE SET state_json = excluded.state_json, updated_at = excluded.updated_at
  `).run(req.userId, JSON.stringify(state));

  res.json({ ok: true });
});

export default router;
