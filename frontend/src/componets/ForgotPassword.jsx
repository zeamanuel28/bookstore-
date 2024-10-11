// components/ForgotPassword.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // Make sure you have axios installed

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  const handleForgotPassword = async (e) => {
    e.preventDefault(); // Prevent default form submission
    try {
      const response = await axios.post('/api/auth/forgot-password', { email }); // Adjust the URL if necessary
      setMessage(response.data.message); // Set success message from the response
    } catch (err) {
      console.error('Failed to send reset link:', err);
      setMessage('Failed to send reset link. Please try again.');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-purple-600">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-sm w-full">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Forgot Password</h2>
        <form onSubmit={handleForgotPassword}>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required // Optional: ensures the field is filled out
          />
          <button
            type="submit" // Change button type to submit
            className="w-full p-3 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition duration-200 ease-in-out"
          >
            Send Reset Link
          </button>
        </form>
        {message && <p className="mt-4 text-center text-red-600">{message}</p>}
        <p className="mt-4 text-center">
          Remembered your password? 
          <button 
            onClick={() => navigate('/login')} 
            className="text-blue-600 hover:underline">
            Login
          </button>
        </p>
      </div>
    </div>
  );
};

export default ForgotPassword;
