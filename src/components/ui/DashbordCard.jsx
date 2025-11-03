import { useReport } from '../../context/ReportContext';

export default function DashboardCards() {
  const { reports } = useReport();
  const pendingInstalls = 3; // Mock

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="bg-blue-600 text-white p-6 rounded-lg shadow">
        <h3 className="text-xl font-bold">Total Reports</h3>
        <p className="text-3xl">{reports.length}</p>
      </div>
      <div className="bg-yellow-600 text-white p-6 rounded-lg shadow">
        <h3 className="text-xl font-bold">Pending Installs</h3>
        <p className="text-3xl">{pendingInstalls}</p>
      </div>
      <div className="bg-green-600 text-white p-6 rounded-lg shadow">
        <h3 className="text-xl font-bold">Revenue Today</h3>
        <p className="text-3xl">$1,240</p>
      </div>
    </div>
  );
}