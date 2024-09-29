// components/Home.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate('/login'); // Navigate to the login page
  };

  const handleSignup = () => {
    navigate('/signup'); // Navigate to the signup page
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-r from-blue-500 to-purple-600 text-white">
      <h1 className="text-5xl font-bold mb-6 animate__animated animate__fadeInDown">Welcome to the Bookstore</h1>
      <div className="flex space-x-4">
        <button
          onClick={handleLogin}
          className="bg-white text-blue-600 px-6 py-3 rounded-lg shadow-lg hover:shadow-xl transition-transform transform hover:scale-105 animate__animated animate__bounceInLeft"
        >
          Login
        </button>
        <button
          onClick={handleSignup}
          className="bg-white text-green-600 px-6 py-3 rounded-lg shadow-lg hover:shadow-xl transition-transform transform hover:scale-105 animate__animated animate__bounceInRight"
        >
          Signup
        </button>
      </div>
    </div>
  );
};

export default Home;
