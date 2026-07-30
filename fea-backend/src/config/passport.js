/* ============================================================
   passport.js — Google/GitHub OAuth strategies. Both need real
   credentials from the respective developer consoles before
   they'll work — see backend/.env.example and the README for the
   exact steps. Without credentials set, these routes simply won't
   be registered (see server.js) and email/password auth still
   works fine on its own.
   ============================================================ */

import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { Strategy as GitHubStrategy } from 'passport-github2';
import db from '../db/db.js';

function findOrCreateByProvider({ providerColumn, providerId, email, name }) {
  let user = db.prepare(`SELECT * FROM users WHERE ${providerColumn} = ?`).get(providerId);
  if (user) return user;

  if (email) {
    user = db.prepare('SELECT * FROM users WHERE email = ?').get(email.toLowerCase());
    if (user) {
      db.prepare(`UPDATE users SET ${providerColumn} = ? WHERE id = ?`).run(providerId, user.id);
      return db.prepare('SELECT * FROM users WHERE id = ?').get(user.id);
    }
  }

  const result = db.prepare(
    `INSERT INTO users (email, name, ${providerColumn}) VALUES (?, ?, ?)`
  ).run(email ? email.toLowerCase() : null, name || 'User', providerId);

  return db.prepare('SELECT * FROM users WHERE id = ?').get(result.lastInsertRowid);
}

export function configurePassport() {
  if (process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET) {
    passport.use(new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: `${process.env.BACKEND_URL || 'http://localhost:4000'}/api/auth/google/callback`,
      },
      (accessToken, refreshToken, profile, done) => {
        const email = profile.emails?.[0]?.value;
        const user = findOrCreateByProvider({
          providerColumn: 'google_id',
          providerId: profile.id,
          email,
          name: profile.displayName,
        });
        done(null, user);
      }
    ));
  }

  if (process.env.GITHUB_CLIENT_ID && process.env.GITHUB_CLIENT_SECRET) {
    passport.use(new GitHubStrategy(
      {
        clientID: process.env.GITHUB_CLIENT_ID,
        clientSecret: process.env.GITHUB_CLIENT_SECRET,
        callbackURL: `${process.env.BACKEND_URL || 'http://localhost:4000'}/api/auth/github/callback`,
      },
      (accessToken, refreshToken, profile, done) => {
        const email = profile.emails?.[0]?.value;
        const user = findOrCreateByProvider({
          providerColumn: 'github_id',
          providerId: String(profile.id),
          email,
          name: profile.displayName || profile.username,
        });
        done(null, user);
      }
    ));
  }
}

export function hasGoogleAuth() {
  return !!(process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET);
}

export function hasGitHubAuth() {
  return !!(process.env.GITHUB_CLIENT_ID && process.env.GITHUB_CLIENT_SECRET);
}
