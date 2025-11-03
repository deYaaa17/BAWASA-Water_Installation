import { NavLink } from 'react-router-dom';
import { Home, AlertTriangle, DollarSign, MapPin, Wrench, Settings } from 'lucide-react';

const navItems = [
  { to: '/', icon: Home, label: 'Dashboard' },
  { to: '/reports', icon: AlertTriangle, label: 'Reports' },
  { to: '/billing', icon: DollarSign, label: 'Billing' },
  { to: '/map', icon: MapPin, label: 'Map View' },
  
  { to: '/installations', icon: Wrench, label: 'Installations' },
  { to: '/settings', icon: Settings, label: 'Settings' },
];

export default function Sidebar() {
  return (
    <aside className="w-64 bg-white shadow-lg h-screen fixed left-0 top-0 overflow-y-auto">
      <div className="p-6">
        <h1 className="text-2xl font-bold text-blue-700">BAWASA</h1>
        <p className="text-xs text-gray-500">Water Management</p>
      </div>
      <nav className="mt-6">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              `flex items-center gap-3 px-6 py-3 text-gray-700 hover:bg-blue-50 transition ${
                isActive ? 'bg-blue-100 text-blue-700 border-r-4 border-blue-700' : ''
              }`
            }
          >
            <item.icon size={20} />
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}