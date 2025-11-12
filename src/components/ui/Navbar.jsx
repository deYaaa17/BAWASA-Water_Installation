import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <header className="sticky top-0 z-30 bg-white/70 backdrop-blur border-b border-blue-100 dark:bg-gray-900/70 dark:border-gray-800">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-4 py-3">
        <Link to="/" className="text-2xl font-bold">BAWASA CARMUNDO</Link>
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-700 dark:text-gray-300">Welcome, {user?.name || 'User'}</span>
          <button onClick={logout} className="bg-red-600 text-white px-4 py-1.5 rounded hover:bg-red-700">
            Logout
          </button>
        </div>
      </div>
    </header>
  );
}