import { useReport } from '../../context/ReportContext';

export default function Reports() {
  const { reports } = useReport();

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Damage Reports</h1>
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left">Location</th>
              <th className="px-6 py-3 text-left">Description</th>
              <th className="px-6 py-3 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {reports.map((r) => (
              <tr key={r.id} className="border-t">
                <td className="px-6 py-4">{r.location}</td>
                <td className="px-6 py-4">{r.description}</td>
                <td className="px-6 py-4">
                  <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-sm">Pending</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}