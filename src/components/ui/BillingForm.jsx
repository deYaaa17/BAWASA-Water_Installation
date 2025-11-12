import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useBilling } from '../../context/BillingContext';

export default function BillingForm() {
  const [customerId, setCustomerId] = useState('');
  const [amount, setAmount] = useState('');
  const getLocalDate = () => {
    const d = new Date();
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${y}-${m}-${day}`;
  };
  const [date, setDate] = useState(getLocalDate());
  const { token, API_BASE } = useAuth();
  const { increment } = useBilling();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/api/billings`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          customer_name: customerId,
          amount: Number(amount),
          date,
        }),
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err?.message || 'Failed to save billing');
      }
      const todayStr = getLocalDate();
      if (date === todayStr) {
        increment(Number(amount));
      }
      // Save latest receipt for the BAWASA Water Bill section and notify listeners
      try {
        const latestReceipt = {
          customerName: customerId,
          amount: Number(amount).toFixed(2),
          date,
        };
        localStorage.setItem('latestReceipt', JSON.stringify(latestReceipt));
        if (typeof window !== 'undefined' && typeof window.dispatchEvent === 'function') {
          window.dispatchEvent(new CustomEvent('latest-receipt-updated'));
        }
      } catch (_) {}
      alert('Billing saved!');
      setCustomerId('');
      setAmount('');
      setDate(getLocalDate());
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md max-w-lg w-full mx-auto">
      <h3 className="text-lg font-semibold mb-4">Encode Billing</h3>
      {error ? <div className="mb-3 text-sm text-red-600">{error}</div> : null}
      <input
        type="text"
        placeholder="Customer Name"
        value={customerId}
        onChange={(e) => setCustomerId(e.target.value)}
        className="w-full p-2 border rounded mb-3"
        required
      />
      <input
        type="number"
        placeholder="Amount "
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        className="w-full p-2 border rounded mb-3"
        required
      />
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        className="w-full p-2 border rounded mb-3"
      />
      <button type="submit" disabled={loading} className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 disabled:opacity-60">
        {loading ? 'Saving...' : 'Encode & Save'}
      </button>
    </form>
  );
}