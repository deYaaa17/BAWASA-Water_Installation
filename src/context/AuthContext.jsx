import { createContext, useContext, useEffect, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:8000';
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const run = async () => {
      try {
        const stored = localStorage.getItem('auth');
        if (stored) {
          const { token: t, user: u } = JSON.parse(stored);
          setToken(t);
          setUser(u ?? null);
          if (t) {
            try {
              const res = await fetch(`${API_BASE}/api/me`, {
                headers: { Authorization: `Bearer ${t}`, Accept: 'application/json' },
              });
              if (res.ok) {
                const me = await res.json().catch(() => null);
                if (me && me.id) {
                  const refreshed = { token: t, user: me };
                  setUser(me);
                  localStorage.setItem('auth', JSON.stringify(refreshed));
                }
              } else if (res.status === 401 || res.status === 419) {
                localStorage.removeItem('auth');
                setToken(null);
                setUser(null);
              }
            } catch (_) {
              // Network or transient error: keep stored auth and proceed
            }
          }
        }
      } finally {
        setReady(true);
      }
    };
    run();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const login = async ({ email, password }) => {
    const res = await fetch(`${API_BASE}/api/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      const firstValidation = err?.errors && Object.values(err.errors)[0]?.[0];
      const msg = err?.message || firstValidation || 'Login failed';
      // Clear any stale auth to avoid cascading 401s from old tokens
      localStorage.removeItem('auth');
      setToken(null);
      setUser(null);
      throw new Error(msg);
    }
    const data = await res.json();
    setToken(data.token);
    setUser(data.user);
    localStorage.setItem('auth', JSON.stringify({ token: data.token, user: data.user }));
  };

  const logout = async () => {
    try {
      if (token) {
        await fetch(`${API_BASE}/api/logout`, {
          method: 'POST',
          headers: { Authorization: `Bearer ${token}`, Accept: 'application/json' },
        });
      }
    } catch (_) {}
    localStorage.removeItem('auth');
    setToken(null);
    setUser(null);
  };

  const value = { user, token, login, logout, API_BASE, ready };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);