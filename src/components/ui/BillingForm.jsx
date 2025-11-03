import { useState } from 'react';

export default function BillingForm() {
  const [customerId, setCustomerId] = useState('');
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const receipt = { customerId, amount, date };
    localStorage.setItem('latestReceipt', JSON.stringify(receipt));
    alert('Billing encoded! Go to Print Receipt.');
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md max-w-lg w-full mx-auto">
      <h3 className="text-lg font-semibold mb-4">Encode Billing</h3>
      <input
        type="text"
        placeholder="Customer ID"
        value={customerId}
        onChange={(e) => setCustomerId(e.target.value)}
        className="w-full p-2 border rounded mb-3"
        required
      />
      <input
        type="number"
        placeholder="Amount (USD)"
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
      <button type="submit" className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700">
        Encode & Save
      </button>
    </form>
  );
}