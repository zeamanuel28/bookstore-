// components/Login.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie'; // For cookie handling
import { useLoginMutation } from '../service/auth/AuthApi'; // Import RTK Query login mutation

const Login = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  // Use RTK Query login mutation
  const [login, { isLoading, error }] = useLoginMutation();

  const handleLogin = async () => {
    try {
      const user = await login({ name, email, password }).unwrap(); // Call the login API

      // Store user details locally
      localStorage.setItem('user', JSON.stringify({ name: user.name, email: user.email }));
      
      // Set cookie with email or another identifier
      Cookies.set('userEmail', email, { expires: 7 }); // Expires in 7 days

      // Redirect to dashboard after successful login
      navigate('/dashboard');
    } catch (err) {
      console.error('Failed to login:', err.message || err);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-purple-600">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-sm w-full">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Login</h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleLogin();
          }}
        >
          {/* Name Input */}
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Name"
            className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />

          {/* Email Input */}
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />

          {/* Password Input */}
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className={`w-full p-3 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition duration-200 ease-in-out ${
              isLoading ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {isLoading ? 'Loading...' : 'Login'}
          </button>
        </form>

        {error && (
          <p className="mt-4 text-red-600 text-center">
            Failed to login: {error.data?.message}
          </p>
        )}

        {/* Forgot password and Signup */}
        <p className="mt-4 text-center">
          Forgot your password?{' '}
          <button
            onClick={() => navigate('/forgotpassword')}
            className="text-blue-600 hover:underline"
          >
            Reset it here
          </button>
        </p>
        <p className="mt-4 text-center">
          Don't have an account?{' '}
          <button
            onClick={() => navigate('/signup')}
            className="text-blue-600 hover:underline"
          >
            Sign Up
          </button>
        </p>
      </div>
    </div>
  );
};

export default Login;
