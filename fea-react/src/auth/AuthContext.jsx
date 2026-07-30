import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import * as authApi from '../api/auth.js';
import { setAuthToken, loadRemoteState, resetToDefault } from '../store/store.js';

const TOKEN_KEY = 'fea_token';
const AuthCtx = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // On boot: if a token was saved from a previous session, validate
  // it and pull that user's state from the server before rendering
  // any protected route.
  useEffect(() => {
    const token = localStorage.getItem(TOKEN_KEY);
    if (!token) {
      setLoading(false);
      return;
    }
    setAuthToken(token);
    authApi.fetchMe(token)
      .then(async ({ user: me }) => {
        setUser(me);
        await loadRemoteState();
      })
      .catch(() => {
        localStorage.removeItem(TOKEN_KEY);
        setAuthToken(null);
      })
      .finally(() => setLoading(false));
  }, []);

  const applySession = useCallback(async (token, sessionUser) => {
    localStorage.setItem(TOKEN_KEY, token);
    setAuthToken(token);
    setUser(sessionUser);
    await loadRemoteState();
  }, []);

  const signup = useCallback(async (email, password, name) => {
    const { token, user: newUser } = await authApi.signup({ email, password, name });
    await applySession(token, newUser);
  }, [applySession]);

  const login = useCallback(async (email, password) => {
    const { token, user: loggedInUser } = await authApi.login({ email, password });
    await applySession(token, loggedInUser);
  }, [applySession]);

  // Used by AuthCallbackPage after a Google/GitHub redirect hands
  // back a token in the URL.
  const completeOAuth = useCallback(async (token) => {
    setAuthToken(token);
    const { user: oauthUser } = await authApi.fetchMe(token);
    await applySession(token, oauthUser);
  }, [applySession]);

  const logout = useCallback(() => {
    localStorage.removeItem(TOKEN_KEY);
    setAuthToken(null);
    resetToDefault();
    setUser(null);
  }, []);

  return (
    <AuthCtx.Provider value={{ user, loading, signup, login, logout, completeOAuth }}>
      {children}
    </AuthCtx.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthCtx);
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider');
  return ctx;
}
