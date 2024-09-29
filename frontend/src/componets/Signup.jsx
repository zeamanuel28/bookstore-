// components/Signup.js
import React, { useState } from 'react';
import { useSignupMutation } from '../features/auth/authApi';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [signup, { isLoading, isError, error }] = useSignupMutation();
  const navigate = useNavigate();

  // Validation States
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [nameError, setNameError] = useState(''); // Add name error state

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Basic email regex
    return emailRegex.test(email);
  };

  const validatePassword = (password) => {
    // Password must be at least 8 characters and include uppercase, lowercase, and a number
    const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/;
    return strongPasswordRegex.test(password);
  };

  const handleSignup = async () => {
    // Reset error messages
    setEmailError('');
    setPasswordError('');
    setNameError('');

    // Validate fields
    if (!name) {
      setNameError('Please fill in your name.'); // Check for empty name
      return;
    }

    if (!validateEmail(email)) {
      setEmailError('Please enter a valid email address.');
      return;
    }

    if (!validatePassword(password)) {
      setPasswordError('Password must be at least 8 characters long and include uppercase letters, lowercase letters, and numbers.');
      return;
    }

    try {
      const user = await signup({ name, email, password }).unwrap();
      localStorage.setItem('user', JSON.stringify(user));
      navigate('/dashboard');
    } catch (err) {
      console.error('Failed to sign up:', err);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-purple-600">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-sm w-full">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Signup</h2>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
          className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {nameError && <p className="text-red-600 mb-2">{nameError}</p>} {/* Display name error */}

        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {emailError && <p className="text-red-600 mb-2">{emailError}</p>} {/* Display email error */}

        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {passwordError && <p className="text-red-600 mb-2">{passwordError}</p>} {/* Display password error */}

        <button
          onClick={handleSignup}
          disabled={isLoading}
          className={`w-full p-3 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition duration-200 ease-in-out ${
            isLoading ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          {isLoading ? 'Signing up...' : 'Signup'}
        </button>
        {isError && <p className="mt-4 text-red-600 text-center">{error?.data?.message || 'Signup failed. Please try again.'}</p>}
      </div>
    </div>
  );
};

export default Signup;
