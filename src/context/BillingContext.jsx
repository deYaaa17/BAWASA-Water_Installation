import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { useAuth } from './AuthContext';

const BillingContext = createContext();

export const BillingProvider = ({ children }) => {
  const { token, API_BASE } = useAuth();
  const [todayRevenue, setTodayRevenue] = useState(0);

  const fetchToday = async () => {
    if (!token) return;
    try {
      const url = new URL(`${API_BASE}/api/billings`);
      url.searchParams.set('date', 'today');
      const res = await fetch(url.toString(), {
        headers: { Authorization: `Bearer ${token}`, Accept: 'application/json' },
      });
      if (res.ok) {
        const data = await res.json();
        const total = (data.billings || []).reduce((sum, b) => sum + Number(b.amount || 0), 0);
        setTodayRevenue(total);
      }
    } catch (_) {}
  };

  useEffect(() => {
    fetchToday();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token, API_BASE]);

  const increment = (amount) => setTodayRevenue((v) => v + Number(amount || 0));

  const value = useMemo(() => ({ todayRevenue, refresh: fetchToday, increment }), [todayRevenue]);
  return <BillingContext.Provider value={value}>{children}</BillingContext.Provider>;
};

export const useBilling = () => useContext(BillingContext);
