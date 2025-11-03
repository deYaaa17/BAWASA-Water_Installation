import { Routes, Route } from 'react-router-dom';
import Dashboard from '../pages/user/Dashboard';
import Reports from '../pages/user/Reports';
import Billing from '../pages/user/Billing';
import Map from '../pages/user/Map';
import Installations from '../pages/user/Installations';
import Settings from '../pages/user/Settings';

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/reports" element={<Reports />} />
      <Route path="/billing" element={<Billing />} />
      <Route path="/map" element={<Map />} />
      <Route path="/installations" element={<Installations />} />
      <Route path="/settings" element={<Settings />} />
    </Routes>
  );
};

export default AppRouter;