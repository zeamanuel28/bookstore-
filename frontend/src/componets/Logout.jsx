// components/Logout.js
import React from 'react';
import { useLogoutMutation } from '../features/auth/authApi';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
  const [logout] = useLogoutMutation();
  const navigate = useNavigate();

  const handleLogout = async () => {
    if (window.confirm("Are you sure you want to log out?")) {
      try {
        await logout().unwrap();
        localStorage.removeItem('user'); // Remove user info
        navigate('/'); // Redirect to home page
      } catch (err) {
        console.error('Failed to logout:', err);
      }
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-md w-80 text-center">
        <h2 className="text-2xl mb-4">Logout</h2>
        <p className="mb-4">Are you sure you want to log out?</p>
        <button
          onClick={handleLogout}
          className="w-full p-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
        >
          Logout
        </button>
        <button
          onClick={() => navigate('/dashboard')} // Option to cancel logout and go back
          className="mt-2 w-full p-2 border rounded text-gray-700 hover:bg-gray-200 transition"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default Logout;
