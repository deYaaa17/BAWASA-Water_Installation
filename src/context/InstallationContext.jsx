import { createContext, useContext, useEffect, useState } from 'react';
import { useAuth } from './AuthContext';

const InstallationContext = createContext();

export const InstallationProvider = ({ children }) => {
  const { token, API_BASE } = useAuth();
  const [count, setCount] = useState(0);

  const fetchCount = async () => {
    if (!token) return;
    try {
      const res = await fetch(`${API_BASE}/api/installations/count`, {
        headers: { Authorization: `Bearer ${token}`, Accept: 'application/json' },
      });
      if (res.ok) {
        const data = await res.json();
        setCount(typeof data.total === 'number' ? data.total : 0);
      }
    } catch (_) {}
  };

  useEffect(() => {
    fetchCount();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token, API_BASE]);

  const increment = (n = 1) => setCount((c) => c + n);

  const value = { pendingCount: count, refresh: fetchCount, increment };
  return <InstallationContext.Provider value={value}>{children}</InstallationContext.Provider>;
};

export const useInstallations = () => useContext(InstallationContext);
