import { useState } from 'react';
import { useReport } from '../../context/ReportContext';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function ReportForm() {
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');
  const { addReport } = useReport();
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) return; // guard

    // Default to Carmundo, Bongabong center if geocoding fails
    let coords = { lat: 12.7311, lng: 121.4156 };
    try {
      const query = encodeURIComponent(`${location}, Bongabong, Oriental Mindoro, Philippines`);
      const url = `https://nominatim.openstreetmap.org/search?q=${query}&format=json&limit=1`;
      const res = await fetch(url, {
        headers: { Accept: 'application/json' },
      });
      if (res.ok) {
        const results = await res.json();
        if (Array.isArray(results) && results.length > 0) {
          const first = results[0];
          const lat = Number(first.lat);
          const lng = Number(first.lon);
          if (!Number.isNaN(lat) && !Number.isNaN(lng)) {
            coords = { lat, lng };
          }
        }
      }
    } catch (_) {}

    await addReport({
      location,
      description,
      lat: coords.lat,
      lng: coords.lng,
      submittedBy: { id: user.id, name: user.name, email: user.email },
      status: 'Pending',
    });
    setLocation('');
    setDescription('');
  };

  return (
    <div className="max-w-lg w-full mx-auto">
      {!user ? (
        <div className="bg-white p-6 rounded-lg shadow-md text-center">
          <h3 className="text-lg font-semibold mb-2">Sign in required</h3>
          <p className="text-sm text-gray-600 mb-4">Please login to submit a damage report.</p>
          <button
            type="button"
            onClick={() => navigate('/login')}
            className="inline-flex items-center justify-center bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Go to Login
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-4">Report Damaged Hose</h3>
          <input
            type="text"
            placeholder="Location (e.g., Riverside, Carmundo)"
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
      )}
    </div>
  );
}