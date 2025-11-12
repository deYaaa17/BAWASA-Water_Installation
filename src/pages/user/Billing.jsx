import { useEffect, useRef, useState } from 'react';
import BillingForm from '../../components/ui/BillingForm';
import ReceiptPrint from '../../components/ui/ReceiptPrint';
import { useAuth } from '../../context/AuthContext';
import { useLocation } from 'react-router-dom';
import { useBilling } from '../../context/BillingContext';

export default function Billing() {
  const { token, API_BASE } = useAuth();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const dateFilter = params.get('date');
  const [items, setItems] = useState([]);
  const [printItem, setPrintItem] = useState(null);
  const printRef = useRef(null);
  const { refresh } = useBilling();

  const formatDate = (raw) => {
    if (typeof raw !== 'string') return raw;
    const parts = raw.split('-').map(Number);
    if (parts.length === 3 && parts.every((n) => !Number.isNaN(n))) {
      const [y, m, d] = parts;
      const dt = new Date(y, m - 1, d);
      return dt.toLocaleDateString(undefined, { month: 'long', day: 'numeric', year: 'numeric' });
    }
    const dt = new Date(raw);
    if (!Number.isNaN(dt.getTime())) {
      return dt.toLocaleDateString(undefined, { month: 'long', day: 'numeric', year: 'numeric' });
    }
    return raw;
  };

  useEffect(() => {
    const run = async () => {
      if (!token) return;
      const url = new URL(`${API_BASE}/api/billings`);
      if (dateFilter) url.searchParams.set('date', dateFilter);
      try {
        const res = await fetch(url.toString(), {
          headers: { Authorization: `Bearer ${token}`, Accept: 'application/json' },
        });
        if (res.ok) {
          const data = await res.json();
          setItems(data.billings || []);
        }
      } catch (_) {}
    };

  const onPrint = (b) => {
    setPrintItem(b);
  };

    run();
  }, [token, API_BASE, dateFilter]);

  const onEdit = async (b) => {
    if (!token) return;
    const customer_name = window.prompt('Update customer', b.customer_name);
    if (customer_name === null) return;
    const amountStr = window.prompt('Update amount', String(b.amount));
    if (amountStr === null) return;
    const amount = Number(amountStr);
    if (Number.isNaN(amount)) return alert('Amount must be a number');
    const date = window.prompt('Update date (YYYY-MM-DD)', b.date);
    if (date === null) return;
    try {
      const res = await fetch(`${API_BASE}/api/billings/${b.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ customer_name, amount, date }),
      });
      if (!res.ok) throw new Error('Failed to update billing');
      const data = await res.json();
      setItems((prev) => prev.map((x) => (x.id === b.id ? data.billing : x)));
      if (dateFilter === 'today') refresh();
    } catch (e) {
      alert(e.message);
    }
  };

  const onDelete = async (b) => {
    if (!token) return;
    if (!window.confirm('Delete this billing?')) return;
    try {
      const res = await fetch(`${API_BASE}/api/billings/${b.id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}`, Accept: 'application/json' },
      });
      if (!res.ok) throw new Error('Failed to delete');
      setItems((prev) => prev.filter((x) => x.id !== b.id));
      if (dateFilter === 'today') refresh();
    } catch (e) {
      alert(e.message);
    }
  };
  return (
    <div>
      {/* Main content (hidden when printing) */}
      <div className="print:hidden">
        <h1 className="text-3xl font-bold mb-6">Billing Management</h1>
        <div className="grid md:grid-cols-2 gap-6">
          <BillingForm />
          <ReceiptPrint />
        </div>
        <div className="mt-10">
          <h2 className="text-xl font-semibold mb-4">{dateFilter === 'today' ? 'Payments Today' : 'All Payments'}</h2>
          <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left">Customer</th>
                <th className="px-6 py-3 text-left">Amount</th>
                <th className="px-6 py-3 text-left">Date</th>
                <th className="px-6 py-3 text-left">Recorded By</th>
                <th className="px-6 py-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {items.map((b) => (
                <tr key={b.id} className="border-t">
                  <td className="px-6 py-4">{b.customer_name}</td>
                  <td className="px-6 py-4">{Number(b.amount).toFixed(2)}</td>
                  <td className="px-6 py-4">{formatDate(b.date)}</td>
                  <td className="px-6 py-4">{b.user ? b.user.name : '—'}</td>
                  <td className="px-6 py-4 space-x-2">
                    <button
                      onClick={() => onEdit(b)}
                      className="inline-flex items-center gap-1 px-3 py-1 rounded bg-blue-600 text-white hover:bg-blue-700 text-sm shadow"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
                        <path d="M12 20h9"/>
                        <path d="M16.5 3.5a2.121 2.121 0 1 1 3 3L7 19l-4 1 1-4 12.5-12.5z"/>
                      </svg>
                      Edit
                    </button>
                    <button
                      onClick={() => onDelete(b)}
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
        {printItem && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-md p-6">
              <h3 className="text-lg font-semibold mb-4">Receipt Preview</h3>
              <div className="text-gray-900 dark:text-gray-100">
                <div className="flex mb-2"><span className="w-40 font-semibold">Customer:</span><span>{printItem.customer_name}</span></div>
                <div className="flex mb-2"><span className="w-40 font-semibold">Amount:</span><span>{Number(printItem.amount).toFixed(2)}</span></div>
                <div className="flex mb-2"><span className="w-40 font-semibold">Date:</span><span>{printItem.date}</span></div>
                <div className="flex mb-4"><span className="w-40 font-semibold">Recorded By:</span><span>{printItem.user ? printItem.user.name : '—'}</span></div>
              </div>
              <div className="mt-6 flex justify-end gap-2">
                <button onClick={() => setPrintItem(null)} className="px-4 py-2 rounded bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600">Close</button>
                <button onClick={() => window.print()} className="px-4 py-2 rounded bg-gray-800 text-white hover:bg-black">Print</button>
              </div>
            </div>
          </div>
        )}
      </div>
      </div>

      {/* Print-only receipt section */}
      {printItem && (
        <div ref={printRef} className="hidden print:block p-8 text-gray-900">
          <h2 className="text-2xl font-bold text-center mb-6">BAWASA CARMUNDO — Payment Receipt</h2>
          <div className="max-w-md mx-auto">
            <div className="flex mb-2"><span className="w-40 font-semibold">Customer:</span><span>{printItem.customer_name}</span></div>
            <div className="flex mb-2"><span className="w-40 font-semibold">Amount:</span><span>{Number(printItem.amount).toFixed(2)}</span></div>
            <div className="flex mb-2"><span className="w-40 font-semibold">Date:</span><span>{printItem.date}</span></div>
            <div className="flex mb-4"><span className="w-40 font-semibold">Recorded By:</span><span>{printItem.user ? printItem.user.name : '—'}</span></div>
            <hr className="my-4" />
            <p className="text-center text-sm text-gray-600">Thank you for your payment!</p>
          </div>
        </div>
      )}
    </div>
  );
}