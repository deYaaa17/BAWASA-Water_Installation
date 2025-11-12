import { createContext, useContext, useEffect, useState } from 'react';
import { useAuth } from './AuthContext';

const ReportContext = createContext();

export const ReportProvider = ({ children }) => {
  const [reports, setReports] = useState([
    { id: 1, location: '12 Main St', description: 'Leaking hose', lat: -20.15, lng: 28.58 },
  ]);
  const { token, API_BASE, user, logout } = useAuth();
  const [total, setTotal] = useState(null);

  useEffect(() => {
    const fetchCount = async () => {
      if (!token) return;
      try {
        const res = await fetch(`${API_BASE}/api/reports/count`, {
          headers: { Authorization: `Bearer ${token}`, Accept: 'application/json' },
        });
        if (res.ok) {
          const data = await res.json();
          setTotal(data.total);
        } else if (res.status === 401) {
          // Token invalid/expired; clear auth so app redirects to login
          await logout();
        }
      } catch (_) {}
    };
    fetchCount();
  }, [token, API_BASE]);

  const addReport = async (report) => {
    // Optimistic local update; will be replaced with server response id
    const temp = { ...report, id: Date.now() };
    setReports((prev) => [...prev, temp]);
    try {
      const res = await fetch(`${API_BASE}/api/reports`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          location: report.location,
          description: report.description,
          lat: report.lat ?? null,
          lng: report.lng ?? null,
        }),
      });
      if (!res.ok) throw new Error('Failed to save report');
      const data = await res.json();
      const saved = data.report;
      // Replace temp with saved
      setReports((prev) => prev.map((r) => (r.id === temp.id ? saved : r)));
      setTotal((prev) => (typeof prev === 'number' ? prev + 1 : prev));
    } catch (e) {
      // Revert optimistic insert on failure
      setReports((prev) => prev.filter((r) => r.id !== temp.id));
      throw e;
    }
  };

  return (
    <ReportContext.Provider value={{ reports, total, addReport }}>
      {children}
    </ReportContext.Provider>
  );
};

export const useReport = () => useContext(ReportContext);