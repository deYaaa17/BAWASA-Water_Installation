import Navbar from './components/ui/Navbar';
import Sidebar from './components/ui/Sidebar';
import Footer from './components/ui/Footer';
import AppRouter from './router/AppRoutes';

function App() {
  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Navbar />
        <main className="flex-1 p-6">
          <AppRouter />
        </main>
        <Footer />
      </div>
    </div>
  );
}

export default App;