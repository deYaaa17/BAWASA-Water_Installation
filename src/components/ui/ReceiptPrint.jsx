import { useReactToPrint } from 'react-to-print';
import { useEffect, useRef, useState } from 'react';

export default function ReceiptPrint() {
  const [receipt, setReceipt] = useState(() => JSON.parse(localStorage.getItem('latestReceipt') || '{}'));
  const componentRef = useRef();
  const handlePrint = useReactToPrint({ content: () => componentRef.current });

  const manualPrintFallback = () => {
    try {
      const node = componentRef.current;
      if (!node) return;
      const printWindow = window.open('', '_blank', 'width=800,height=600');
      if (!printWindow) return; // popup blocked
      printWindow.document.open();
      printWindow.document.write(`<!doctype html><html><head><title>Receipt</title>
        <meta charset="utf-8" />
        <style>
          body { font-family: system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif; padding: 24px; }
          h2 { margin: 0 0 16px; text-align:center; }
          hr { margin: 16px 0; }
        </style>
      </head><body>${node.outerHTML}</body></html>`);
      printWindow.document.close();
      printWindow.focus();
      printWindow.print();
      // Allow user to close manually if desired
    } catch (e) {
      console.error('Manual print failed:', e);
    }
  };

  const customerName = receipt.customerName || receipt.customerId;
  const amount = receipt.amount;
  const date = (() => {
    const raw = receipt.date;
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
  })();

  useEffect(() => {
    const onUpdate = () => {
      try {
        const latest = JSON.parse(localStorage.getItem('latestReceipt') || '{}');
        setReceipt(latest);
      } catch (_) {}
    };
    window.addEventListener('latest-receipt-updated', onUpdate);
    return () => window.removeEventListener('latest-receipt-updated', onUpdate);
  }, []);

  

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      
      <button onClick={manualPrintFallback} className="ml-2 mb-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
        Print Receipt
      </button>
      <div ref={componentRef} className="border p-6 text-left">
        <h2 className="text-2xl font-bold text-center mb-4">BAWASA WATER BILL</h2>
        <p><strong>Customer:</strong> {customerName}</p>
        <p><strong>Amount Due:</strong> {amount}</p>
        <p><strong>Date:</strong> {date}</p>
        <hr className="my-4" />
        <p className="text-center">Thank you for your payment!</p>
      </div>
    </div>
  );
}