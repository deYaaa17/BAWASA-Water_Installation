import { useReactToPrint } from 'react-to-print';
import { useRef } from 'react';

export default function ReceiptPrint() {
  const receipt = JSON.parse(localStorage.getItem('latestReceipt') || '{}');
  const componentRef = useRef();
  const handlePrint = useReactToPrint({ content: () => componentRef.current });

  if (!receipt.customerId) return <p className="text-red-500">No receipt to print.</p>;

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <button onClick={handlePrint} className="mb-4 bg-blue-600 text-white px-6 py-2 rounded">
        Print Receipt
      </button>
      <div ref={componentRef} className="border p-6 text-left">
        <h2 className="text-2xl font-bold text-center mb-4">BAWASA WATER BILL</h2>
        <p><strong>Customer ID:</strong> {receipt.customerId}</p>
        <p><strong>Amount Due:</strong> ${receipt.amount}</p>
        <p><strong>Date:</strong> {receipt.date}</p>
        <hr className="my-4" />
        <p className="text-center">Thank you for your payment!</p>
      </div>
    </div>
  );
}