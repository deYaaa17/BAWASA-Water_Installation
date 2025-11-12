import { useEffect, useState } from 'react';
import InstallationForm from '../../components/ui/InstallationForm';
import { useAuth } from '../../context/AuthContext';

export default function Installations() {
  const { token, API_BASE } = useAuth();
  const [items, setItems] = useState([]);

  useEffect(() => {
    const run = async () => {
      if (!token) return;
      try {
        const res = await fetch(`${API_BASE}/api/installations`, {
          headers: { Authorization: `Bearer ${token}`, Accept: 'application/json' },
        });
        if (res.ok) {
          const data = await res.json();
          setItems(data.installations || []);
        }
      } catch (_) {}
    };
    run();
  }, [token, API_BASE]);

  const onEdit = async (i) => {
    if (!token) return;
    const name = window.prompt('Update name', i.name);
    if (name === null) return;
    const address = window.prompt('Update address', i.address);
    if (address === null) return;
    const phone = window.prompt('Update phone', i.phone);
    if (phone === null) return;
    try {
      const res = await fetch(`${API_BASE}/api/installations/${i.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ name, address, phone }),
      });
      if (!res.ok) throw new Error('Failed to update installation');
      const data = await res.json();
      setItems((prev) => prev.map((x) => (x.id === i.id ? data.installation : x)));
    } catch (e) {
      alert(e.message);
    }
  };

  const onDelete = async (i) => {
    if (!token) return;
    if (!window.confirm('Delete this installation?')) return;
    try {
      const res = await fetch(`${API_BASE}/api/installations/${i.id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}`, Accept: 'application/json' },
      });
      if (!res.ok) throw new Error('Failed to delete');
      setItems((prev) => prev.filter((x) => x.id !== i.id));
    } catch (e) {
      alert(e.message);
    }
  };
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">New Installations</h1>
      <div className="max-w-2xl mx-auto">
        <InstallationForm />
      </div>
      <div className="mt-10">
        <h2 className="text-xl font-semibold mb-4">All Installations</h2>
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left">Name</th>
                <th className="px-6 py-3 text-left">Address</th>
                <th className="px-6 py-3 text-left">Phone</th>
                <th className="px-6 py-3 text-left">Created By</th>
                <th className="px-6 py-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {items.map((i) => (
                <tr key={i.id} className="border-t">
                  <td className="px-6 py-4">{i.name}</td>
                  <td className="px-6 py-4">{i.address}</td>
                  <td className="px-6 py-4">{i.phone}</td>
                  <td className="px-6 py-4">{i.user ? i.user.name : '—'}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => onEdit(i)}
                        className="inline-flex items-center gap-1 px-3 py-1 rounded bg-blue-600 text-white hover:bg-blue-700 text-sm shadow"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
                          <path d="M12 20h9"/>
                          <path d="M16.5 3.5a2.121 2.121 0 1 1 3 3L7 19l-4 1 1-4 12.5-12.5z"/>
                        </svg>
                        Edit
                      </button>
                      <button
                        onClick={() => onDelete(i)}
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
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}