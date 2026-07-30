import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext.jsx';
import { googleLoginUrl, githubLoginUrl } from '../api/auth.js';

export default function SignupPage() {
  const { signup } = useAuth();
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setSubmitting(true);
    try {
      await signup(email, password, name);
      navigate('/');
    } catch (err) {
      setError(err.message || 'Signup failed');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h2>Create your account</h2>
        <p className="lede">Track progress, bookmarks, and notes across every device.</p>

        {error && <div className="callout warn">{error}</div>}

        <form onSubmit={handleSubmit}>
          <label>Name</label>
          <input type="text" required value={name} onChange={(e) => setName(e.target.value)} autoComplete="name" />

          <label>Email</label>
          <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="email" />

          <label>Password</label>
          <input type="password" required minLength={8} value={password} onChange={(e) => setPassword(e.target.value)} autoComplete="new-password" />
          <div className="notes-save-hint">At least 8 characters</div>

          <button className="btn primary" type="submit" disabled={submitting} style={{ width: '100%', marginTop: 12 }}>
            {submitting ? 'Creating account\u2026' : 'Sign up'}
          </button>
        </form>

        <div className="auth-divider">or</div>

        <a className="btn" style={{ width: '100%', display: 'block', textAlign: 'center' }} href={googleLoginUrl()}>Continue with Google</a>
        <a className="btn" style={{ width: '100%', display: 'block', textAlign: 'center', marginTop: 8 }} href={githubLoginUrl()}>Continue with GitHub</a>

        <p style={{ marginTop: 16 }}>
          Already have an account? <Link to="/login">Log in</Link>
        </p>
      </div>
    </div>
  );
}
