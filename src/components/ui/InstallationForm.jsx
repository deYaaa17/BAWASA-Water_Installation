import { useState } from 'react';
import { useNotification } from '../../context/NotificationContext';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useInstallations } from '../../context/InstallationContext';

export default function InstallationForm() {
  const { addNotification } = useNotification();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', address: '', phone: '' });
  const { token, API_BASE } = useAuth();
  const { increment } = useInstallations();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const onSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/api/installations`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(form),
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err?.message || 'Failed to save installation');
      }
      // increase pending installs count on dashboard
      increment(1);
      addNotification({
        type: 'installation',
        title: 'New Installation Request',
        message: `${form.name} requested installation at ${form.address} (${form.phone})`,
      });
      navigate('/settings');
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={onSubmit} className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold mb-4">Request New Installation</h3>
      {error ? <div className="mb-3 text-sm text-red-600">{error}</div> : null}
      <input type="text" placeholder="Full Name" value={form.name} onChange={(e)=>setForm({...form,name:e.target.value})} className="w-full p-2 border rounded mb-3" required />
      <input type="text" placeholder="Address" value={form.address} onChange={(e)=>setForm({...form,address:e.target.value})} className="w-full p-2 border rounded mb-3" required />
      <input type="tel" placeholder="Phone" value={form.phone} onChange={(e)=>setForm({...form,phone:e.target.value})} className="w-full p-2 border rounded mb-3" required />
      <button type="submit" disabled={loading} className="w-full bg-purple-600 text-white py-2 rounded hover:bg-purple-700 disabled:opacity-60">
        {loading ? 'Submitting...' : 'Submit Request'}
      </button>
    </form>
  );
}