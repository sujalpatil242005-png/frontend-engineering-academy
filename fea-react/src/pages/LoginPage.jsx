import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext.jsx';
import { googleLoginUrl, githubLoginUrl } from '../api/auth.js';

export default function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setSubmitting(true);
    try {
      await login(email, password);
      navigate('/');
    } catch (err) {
      setError(err.message || 'Login failed');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h2>Welcome back</h2>
        <p className="lede">Log in to sync your progress across devices.</p>

        {error && <div className="callout warn">{error}</div>}

        <form onSubmit={handleSubmit}>
          <label>Email</label>
          <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="email" />

          <label>Password</label>
          <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} autoComplete="current-password" />

          <button className="btn primary" type="submit" disabled={submitting} style={{ width: '100%', marginTop: 12 }}>
            {submitting ? 'Logging in\u2026' : 'Log in'}
          </button>
        </form>

        <div className="auth-divider">or</div>

        <a className="btn" style={{ width: '100%', display: 'block', textAlign: 'center' }} href={googleLoginUrl()}>Continue with Google</a>
        <a className="btn" style={{ width: '100%', display: 'block', textAlign: 'center', marginTop: 8 }} href={githubLoginUrl()}>Continue with GitHub</a>

        <p style={{ marginTop: 16 }}>
          Don't have an account? <Link to="/signup">Sign up</Link>
        </p>
      </div>
    </div>
  );
}
