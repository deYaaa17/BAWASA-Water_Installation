import { useReport } from '../../context/ReportContext';
import { Link } from 'react-router-dom';
import { useInstallations } from '../../context/InstallationContext';
import { useBilling } from '../../context/BillingContext';

export default function DashboardCards() {
  const { reports, total } = useReport();
  const { pendingCount } = useInstallations();
  const { todayRevenue } = useBilling();

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="p-6 rounded-xl shadow bg-gradient-to-br from-blue-600 via-blue-500 to-indigo-500 text-white ring-1 ring-blue-300/30">
        <h3 className="text-xl font-bold">Total Reports</h3>
        <p className="text-3xl">{typeof total === 'number' ? total : reports.length}</p>
        <div className="mt-4">
          <Link to="/reports" className="inline-block bg-white/95 text-blue-700 font-semibold px-3 py-1 rounded hover:bg-white">
            View All
          </Link>
        </div>
      </div>
      <div className="p-6 rounded-xl shadow bg-gradient-to-br from-amber-500 via-amber-400 to-yellow-500 text-white ring-1 ring-amber-300/30">
        <h3 className="text-xl font-bold">Pending Installs</h3>
        <p className="text-3xl">{typeof pendingCount === 'number' ? pendingCount : 0}</p>
        <div className="mt-4">
          <Link to="/installations" className="inline-block bg-white/95 text-amber-700 font-semibold px-3 py-1 rounded hover:bg-white">
            View All
          </Link>
        </div>
      </div>
      <div className="p-6 rounded-xl shadow bg-gradient-to-br from-emerald-600 via-green-500 to-lime-500 text-white ring-1 ring-emerald-300/30">
        <h3 className="text-xl font-bold">Revenue Today</h3>
        <p className="text-3xl">{Number(todayRevenue || 0).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
        <div className="mt-4">
          <Link to="/billing?date=today" className="inline-block bg-white/95 text-emerald-700 font-semibold px-3 py-1 rounded hover:bg-white">
            View All
          </Link>
        </div>
      </div>
    </div>
  );
}