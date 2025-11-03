export default function InstallationForm() {
  return (
    <form className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold mb-4">Request New Installation</h3>
      <input type="text" placeholder="Full Name" className="w-full p-2 border rounded mb-3" required />
      <input type="text" placeholder="Address" className="w-full p-2 border rounded mb-3" required />
      <input type="tel" placeholder="Phone" className="w-full p-2 border rounded mb-3" required />
      <button type="submit" className="w-full bg-purple-600 text-white py-2 rounded hover:bg-purple-700">
        Submit Request
      </button>
    </form>
  );
}