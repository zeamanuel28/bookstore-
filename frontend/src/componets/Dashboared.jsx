// components/Dashboard.js
import React from 'react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate(); // Initialize useNavigate
  const user = JSON.parse(localStorage.getItem('user')); // Fetch user data from localStorage

  const handleLogout = () => {
    localStorage.removeItem('user'); // Clear user data from localStorage
    navigate('/'); // Navigate to the home page
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md text-center">
        <h1 className="text-3xl font-bold mb-4">Dashboard</h1>
        {user ? (
          <div>
            <h2 className="text-2xl mb-2">Welcome, {user.name || user.email}!</h2> {/* Display user name or email */}
            <p className="mb-4 text-gray-600">This is your dashboard where you can manage your account.</p>
            <button
              onClick={handleLogout}
              className="w-full p-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
            >
              Logout
            </button>
            {/* Additional dashboard features can go here */}
          </div>
        ) : (
          <p className="text-gray-600">Please log in to view your dashboard.</p>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
