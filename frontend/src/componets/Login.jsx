// components/Login.js
import React, { useState } from 'react';
import { useLoginMutation } from '../features/auth/authApi';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie'; // Import js-cookie

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [login, { isLoading, isError, error }] = useLoginMutation();
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const user = await login({ email, password }).unwrap();
      localStorage.setItem('user', JSON.stringify(user));
      
      // Set a cookie with the user's email or any other identifier
      Cookies.set('userEmail', email, { expires: 7 }); // Expires in 7 days
      
      navigate('/dashboard'); // Redirect after successful login
    } catch (err) {
      console.error('Failed to login:', err);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-purple-600">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-sm w-full">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Login</h2>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={handleLogin}
          disabled={isLoading}
          className={`w-full p-3 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition duration-200 ease-in-out ${
            isLoading ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          {isLoading ? 'Loading...' : 'Login'}
        </button>
        {isError && <p className="mt-4 text-red-600 text-center">Error: {error.data.message}</p>}
        <p className="mt-4 text-center">
          Forgot your password? 
          <button 
            onClick={() => navigate('/forgotpassword')} 
            className="text-blue-600 hover:underline">
            Reset it here
          </button>
        </p>
      </div>
    </div>
  );
};

export default Login;
