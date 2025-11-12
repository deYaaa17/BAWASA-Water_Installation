import { Routes, Route } from 'react-router-dom';
import Dashboard from '../pages/user/Dashboard';
import Reports from '../pages/user/Reports';
import Billing from '../pages/user/Billing';
import Map from '../pages/user/Map';
import Installations from '../pages/user/Installations';
import Settings from '../pages/user/Settings';
import Login from '../pages/Login';
import PrivateRoute from './PrivateRoute';
const AppRouter = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />

      <Route element={<PrivateRoute />}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/reports" element={<Reports />} />
        <Route path="/billing" element={<Billing />} />
        <Route path="/map" element={<Map />} />
        <Route path="/installations" element={<Installations />} />
        <Route path="/settings" element={<Settings />} />
      </Route>
    </Routes>
  );
};

export default AppRouter;