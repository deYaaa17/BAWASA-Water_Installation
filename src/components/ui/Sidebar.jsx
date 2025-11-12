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
    <>
      {/* Desktop sidebar */}
      <aside className="hidden md:block w-64 h-screen fixed left-0 top-0 overflow-y-auto bg-gradient-to-b from-blue-50 to-white border-r border-blue-100">
        <div className="p-6">
          <div className="flex items-center gap-2 rounded-lg bg-white/70 backdrop-blur ring-1 ring-blue-100 px-3 py-2 shadow-sm">
            <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6 text-blue-600">
              <circle cx="12" cy="12" r="1.8" fill="currentColor" />
              <ellipse cx="12" cy="12" rx="10" ry="4.5" stroke="currentColor" strokeWidth="1.5" />
              <ellipse cx="12" cy="12" rx="10" ry="4.5" stroke="currentColor" strokeWidth="1.5" transform="rotate(60 12 12)" />
              <ellipse cx="12" cy="12" rx="10" ry="4.5" stroke="currentColor" strokeWidth="1.5" transform="rotate(-60 12 12)" />
            </svg>
            <h1 className="text-2xl font-bold tracking-tight text-blue-700">BAWASA</h1>
          </div>
          <p className="mt-2 text-xs font-medium text-blue-800/70">Water Management</p>
        </div>
        <nav className="mt-4">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `mx-3 mb-2 flex items-center gap-3 px-4 py-2.5 rounded-md transition shadow-sm ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-blue-200'
                    : 'text-gray-700 hover:bg-blue-100 hover:text-blue-800'
                }`
              }
            >
              <item.icon size={20} />
              <span className="text-sm font-medium">{item.label}</span>
            </NavLink>
          ))}
        </nav>
      </aside>

      {/* Mobile bottom nav */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-blue-100 shadow-lg">
        <ul className="flex items-center justify-around py-2">
          {navItems.map((item) => (
            <li key={item.to}>
              <NavLink
                to={item.to}
                className={({ isActive }) =>
                  `flex flex-col items-center text-xs px-2 ${
                    isActive ? 'text-blue-700' : 'text-gray-600'
                  }`
                }
              >
                <item.icon size={20} />
                <span className="mt-0.5">{item.label}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
}