import express from 'express';
import bcrypt from 'bcryptjs';
import passport from 'passport';
import db from '../db/db.js';
import { defaultState } from '../db/defaultState.js';
import { signToken, requireAuth } from '../middleware/auth.js';
import { hasGoogleAuth, hasGitHubAuth } from '../config/passport.js';

const router = express.Router();

function toPublicUser(row) {
  return { id: row.id, email: row.email, name: row.name };
}

function ensureUserState(userId) {
  const existing = db.prepare('SELECT 1 FROM user_state WHERE user_id = ?').get(userId);
  if (!existing) {
    db.prepare('INSERT INTO user_state (user_id, state_json) VALUES (?, ?)')
      .run(userId, JSON.stringify(defaultState()));
  }
}

/* ---------- Email + password ---------- */

router.post('/signup', async (req, res) => {
  const { email, password, name } = req.body || {};
  if (!email || !password) return res.status(400).json({ error: 'Email and password are required' });
  if (password.length < 8) return res.status(400).json({ error: 'Password must be at least 8 characters' });

  const existing = db.prepare('SELECT id FROM users WHERE email = ?').get(email.toLowerCase());
  if (existing) return res.status(409).json({ error: 'An account with that email already exists' });

  const hash = await bcrypt.hash(password, 10);
  const result = db.prepare('INSERT INTO users (email, password_hash, name) VALUES (?, ?, ?)')
    .run(email.toLowerCase(), hash, name || email.split('@')[0]);

  ensureUserState(result.lastInsertRowid);
  const user = db.prepare('SELECT * FROM users WHERE id = ?').get(result.lastInsertRowid);

  res.json({ token: signToken(user), user: toPublicUser(user) });
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body || {};
  if (!email || !password) return res.status(400).json({ error: 'Email and password are required' });

  const user = db.prepare('SELECT * FROM users WHERE email = ?').get(email.toLowerCase());
  if (!user || !user.password_hash) return res.status(401).json({ error: 'Invalid email or password' });

  const ok = await bcrypt.compare(password, user.password_hash);
  if (!ok) return res.status(401).json({ error: 'Invalid email or password' });

  res.json({ token: signToken(user), user: toPublicUser(user) });
});

router.get('/me', requireAuth, (req, res) => {
  const user = db.prepare('SELECT * FROM users WHERE id = ?').get(req.userId);
  if (!user) return res.status(404).json({ error: 'User not found' });
  res.json({ user: toPublicUser(user) });
});

/* ---------- Google OAuth ---------- */

router.get('/google', (req, res, next) => {
  if (!hasGoogleAuth()) return res.status(501).json({ error: 'Google login is not configured on this server yet.' });
  passport.authenticate('google', { scope: ['profile', 'email'], session: false })(req, res, next);
});

router.get('/google/callback', (req, res, next) => {
  if (!hasGoogleAuth()) return res.status(501).json({ error: 'Google login is not configured on this server yet.' });
  passport.authenticate('google', { session: false, failureRedirect: '/login?error=google' })(req, res, next);
}, (req, res) => {
  ensureUserState(req.user.id);
  const token = signToken(req.user);
  res.redirect(`${process.env.FRONTEND_URL || 'http://localhost:5173'}/#/auth/callback?token=${token}`);
});

/* ---------- GitHub OAuth ---------- */

router.get('/github', (req, res, next) => {
  if (!hasGitHubAuth()) return res.status(501).json({ error: 'GitHub login is not configured on this server yet.' });
  passport.authenticate('github', { scope: ['user:email'], session: false })(req, res, next);
});

router.get('/github/callback', (req, res, next) => {
  if (!hasGitHubAuth()) return res.status(501).json({ error: 'GitHub login is not configured on this server yet.' });
  passport.authenticate('github', { session: false, failureRedirect: '/login?error=github' })(req, res, next);
}, (req, res) => {
  ensureUserState(req.user.id);
  const token = signToken(req.user);
  res.redirect(`${process.env.FRONTEND_URL || 'http://localhost:5173'}/#/auth/callback?token=${token}`);
});

export default router;
