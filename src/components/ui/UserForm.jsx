import { useState } from 'react';
import { useUser } from '../../context/UserContext';

export default function UserForm({ userToEdit, onClose }) {
  const { addUser, updateUser } = useUser();
  const [form, setForm] = useState(userToEdit || {
    name: '', email: '', role: 'Staff', phone: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (userToEdit) {
      updateUser(userToEdit.id, form);
    } else {
      addUser(form);
    }
    onClose();
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold mb-4">
        {userToEdit ? 'Edit User' : 'Add New User'}
      </h3>

      <input
        type="text"
        placeholder="Full Name"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
        className="w-full p-2 border rounded mb-3"
        required
      />

      <input
        type="email"
        placeholder="Email"
        value={form.email}
        onChange={(e) => setForm({ ...form, email: e.target.value })}
        className="w-full p-2 border rounded mb-3"
        required
      />

      <select
        value={form.role}
        onChange={(e) => setForm({ ...form, role: e.target.value })}
        className="w-full p-2 border rounded mb-3"
      >
        <option value="Admin">Admin</option>
        <option value="Technician">Technician</option>
        <option value="Staff">Staff</option>
        <option value="Customer">Customer</option>
      </select>

      <input
        type="tel"
        placeholder="Phone"
        value={form.phone}
        onChange={(e) => setForm({ ...form, phone: e.target.value })}
        className="w-full p-2 border rounded mb-3"
        required
      />

      <div className="flex gap-2">
        <button type="submit" className="flex-1 bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
          {userToEdit ? 'Update' : 'Add'} User
        </button>
        <button type="button" onClick={onClose} className="flex-1 bg-gray-500 text-white py-2 rounded hover:bg-gray-600">
          Cancel
        </button>
      </div>
    </form>
  );
}