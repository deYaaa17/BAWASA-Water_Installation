import { useNotification } from '../../context/NotificationContext';

export default function Settings() {
  const { notifications, markAllRead, clearNotifications } = useNotification();

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Settings</h1>
      <p className="text-gray-600">Manage system preferences, users, and notifications.</p>
      <div className="bg-white rounded-lg shadow p-4 mb-6">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-xl font-semibold">Notifications</h2>
          <div className="flex gap-2">
            <button onClick={markAllRead} className="px-3 py-1 text-sm bg-gray-100 rounded hover:bg-gray-200">Mark all read</button>
            <button onClick={clearNotifications} className="px-3 py-1 text-sm bg-red-100 text-red-700 rounded hover:bg-red-200">Clear</button>
          </div>
        </div>
        {notifications.length === 0 ? (
          <div className="text-sm text-gray-500">No notifications</div>
        ) : (
          <ul className="divide-y">
            {notifications.map((n) => (
              <li key={n.id} className="py-3 flex items-start gap-3">
                <span className={`mt-1 h-2 w-2 rounded-full ${n.read ? 'bg-gray-300' : 'bg-blue-500'}`} />
                <div>
                  <div className="text-sm font-medium">{n.title}</div>
                  <div className="text-sm text-gray-600">{n.message}</div>
                  <div className="text-xs text-gray-400">{new Date(n.createdAt).toLocaleString()}</div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}