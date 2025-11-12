import { useEffect, useState } from 'react';
import { useReport } from '../../context/ReportContext';
import { useAuth } from '../../context/AuthContext';

export default function Reports() {
  const { reports: localReports } = useReport();
  const { token, API_BASE } = useAuth();
  const [items, setItems] = useState(localReports);

  useEffect(() => {
    const run = async () => {
      if (!token) return;
      try {
        const res = await fetch(`${API_BASE}/api/reports`, {
          headers: { Authorization: `Bearer ${token}`, Accept: 'application/json' },
        });
        if (res.ok) {
          const data = await res.json();
          setItems(data.reports || []);
        }
      } catch (_) {}
    };
    run();
  }, [token, API_BASE]);

  const onEdit = async (r) => {
    if (!token) return;
    const newLocation = window.prompt('Update location', r.location);
    if (newLocation === null) return;
    const newDescription = window.prompt('Update description', r.description);
    if (newDescription === null) return;
    const newStatus = window.prompt('Update status (e.g., Pending, Resolved)', r.status || 'Pending');
    try {
      const res = await fetch(`${API_BASE}/api/reports/${r.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ location: newLocation, description: newDescription, status: newStatus }),
      });
      if (!res.ok) throw new Error('Failed to update report');
      const data = await res.json();
      setItems((prev) => prev.map((x) => (x.id === r.id ? data.report : x)));
    } catch (e) {
      alert(e.message);
    }
  };

  const onDelete = async (r) => {
    if (!token) return;
    if (!window.confirm('Delete this report?')) return;
    try {
      const res = await fetch(`${API_BASE}/api/reports/${r.id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}`, Accept: 'application/json' },
      });
      if (!res.ok) throw new Error('Failed to delete');
      setItems((prev) => prev.filter((x) => x.id !== r.id));
    } catch (e) {
      alert(e.message);
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Damage Reports</h1>
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left">Location</th>
              <th className="px-6 py-3 text-left">Description</th>
              <th className="px-6 py-3 text-left">Reported By</th>
              <th className="px-6 py-3 text-left">Status</th>
              <th className="px-6 py-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.map((r) => (
              <tr key={r.id} className="border-t">
                <td className="px-6 py-4">{r.location}</td>
                <td className="px-6 py-4">{r.description}</td>
                <td className="px-6 py-4">{r.user ? r.user.name : '—'}</td>
                <td className="px-6 py-4">
                  <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-sm">{r.status || 'Pending'}</span>
                </td>
                <td className="px-6 py-4 space-x-2">
                  <button
                    onClick={() => onEdit(r)}
                    className="inline-flex items-center gap-1 px-3 py-1 rounded bg-blue-600 text-white hover:bg-blue-700 text-sm shadow"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
                      <path d="M12 20h9"/>
                      <path d="M16.5 3.5a2.121 2.121 0 1 1 3 3L7 19l-4 1 1-4 12.5-12.5z"/>
                    </svg>
                    Edit
                  </button>
                  <button
                    onClick={() => onDelete(r)}
                    className="inline-flex items-center gap-1 px-3 py-1 rounded bg-red-600 text-white hover:bg-red-700 text-sm shadow"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
                      <polyline points="3 6 5 6 21 6"/>
                      <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/>
                      <path d="M10 11v6M14 11v6"/>
                      <path d="M9 6V4a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2"/>
                    </svg>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}