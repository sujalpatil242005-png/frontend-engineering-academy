import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext.jsx';

export default function AuthCallbackPage() {
  const [params] = useSearchParams();
  const { completeOAuth } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState('');

  useEffect(() => {
    const token = params.get('token');
    if (!token) {
      setError('No login token received.');
      return;
    }
    completeOAuth(token)
      .then(() => navigate('/'))
      .catch(() => setError('Could not complete login.'));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="auth-page">
      <div className="auth-card">
        {error ? (
          <>
            <h2>Login failed</h2>
            <p className="lede">{error}</p>
            <a className="btn primary" href="/login">Back to login</a>
          </>
        ) : (
          <p className="lede">Signing you in&hellip;</p>
        )}
      </div>
    </div>
  );
}
