import Navbar from './components/ui/Navbar';
import Sidebar from './components/ui/Sidebar';
import Footer from './components/ui/Footer';
import AppRouter from './router/AppRoutes';
import { useLocation } from 'react-router-dom';
import { useAuth } from './context/AuthContext';

function App() {
  const location = useLocation();
  const { user } = useAuth();
  const isAuthPage = location.pathname === '/login';
  const showChrome = !isAuthPage && !!user;
  return (
    <div className="min-h-screen flex bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      {showChrome ? <Sidebar /> : null}
      <div className={showChrome ? 'flex-1 flex flex-col ml-64' : 'flex-1 flex flex-col'}>
        {showChrome ? <Navbar /> : null}
        <main className="flex-1 p-6">
          <AppRouter />
        </main>
        {showChrome ? <Footer /> : null}
      </div>
    </div>
  );
}

export default App;