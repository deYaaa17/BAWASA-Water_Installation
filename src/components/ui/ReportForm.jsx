import { useState } from 'react';
import { useReport } from '../../context/ReportContext';

export default function ReportForm() {
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');
  const { addReport } = useReport();

  const handleSubmit = (e) => {
    e.preventDefault();
    addReport({ location, description, lat: -20.15, lng: 28.58 }); // Mock coords
    setLocation('');
    setDescription('');
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md max-w-lg w-full mx-auto">
      <h3 className="text-lg font-semibold mb-4">Report Damaged Hose</h3>
      <input
        type="text"
        placeholder="Location (e.g., 12 Samora Machel Ave)"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        className="w-full p-2 border rounded mb-3"
        required
      />
      <textarea
        placeholder="Describe the damage..."
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="w-full p-2 border rounded mb-3 h-24"
        required
      />
      <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
        Submit Report
      </button>
    </form>
  );
}