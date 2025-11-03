import DashboardCards from '../../components/ui/DashbordCard';
import ReportForm from '../../components/ui/ReportForm';

export default function Dashboard() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      <DashboardCards />
      <div className="mt-8">
        <ReportForm />
      </div>
    </div>
  );
}