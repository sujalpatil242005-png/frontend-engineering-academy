import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import passport from 'passport';
import { configurePassport, hasGoogleAuth, hasGitHubAuth } from './config/passport.js';
import authRoutes from './routes/auth.js';
import stateRoutes from './routes/state.js';

configurePassport();

const app = express();

app.use(cors({ origin: process.env.FRONTEND_URL || 'http://localhost:5173' }));
app.use(express.json());
app.use(passport.initialize());

app.get('/api/health', (req, res) => {
  res.json({
    ok: true,
    googleAuthEnabled: hasGoogleAuth(),
    githubAuthEnabled: hasGitHubAuth(),
  });
});

app.use('/api/auth', authRoutes);
app.use('/api/state', stateRoutes);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`FEA backend listening on http://localhost:${PORT}`);
  console.log(`Google OAuth: ${hasGoogleAuth() ? 'enabled' : 'disabled (no credentials in .env)'}`);
  console.log(`GitHub OAuth: ${hasGitHubAuth() ? 'enabled' : 'disabled (no credentials in .env)'}`);
});
