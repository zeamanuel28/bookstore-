// components/Dashboard.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import book1 from '../assets/book1.jpg';
import book2 from '../assets/book2.jpg';
import book3 from '../assets/book3.jpg';

const Dashboared = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user')); // Retrieve user data from localStorage
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const handleLogout = () => {
    localStorage.removeItem('user'); // Clear user data from localStorage
    navigate('/'); // Navigate to the home page
  };

  return (
    <div className="min-h-screen flex flex-col bg-blue-800 text-white">
      {/* Navigation Bar */}
      <nav className="bg-blue-900 shadow-md">
        <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
          <h1 className="text-2xl font-bold">Bookstore</h1>
          <button
            className="text-white focus:outline-none"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? '✖' : '☰'}
          </button>
        </div>
        {isMenuOpen && (
          <div className="flex flex-col space-y-2 px-4">
            <button
              onClick={() => navigate('/books')}
              className="text-gray-300 hover:text-blue-300"
            >
              Books
            </button>
            <button
              onClick={() => navigate('/profile')}
              className="text-gray-300 hover:text-blue-300"
            >
              Profile
            </button>
            <button
              onClick={handleLogout}
              className="text-gray-300 hover:text-red-300"
            >
              Logout
            </button>
          </div>
        )}
      </nav>

      {/* Main Content */}
      <div className="flex-grow flex flex-col items-center justify-center p-8">
        <h1 className="text-5xl font-bold mb-4 animate-bounce">Welcome, {user?.name || 'Guest'}!</h1>
        <p className="text-lg mb-6">Explore our collection of amazing books and let the adventure begin!</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Book Images */}
          <div className="bg-gray-700 p-4 rounded-lg shadow-lg transition-transform transform hover:scale-105">
            <img src={book1} alt="Book 1" className="w-full h-64 object-cover rounded-md mb-2" />
            <h2 className="font-bold text-xl">Book Title 1</h2>
          </div>
          <div className="bg-gray-700 p-4 rounded-lg shadow-lg transition-transform transform hover:scale-105">
            <img src={book2} alt="Book 2" className="w-full h-64 object-cover rounded-md mb-2" />
            <h2 className="font-bold text-xl">Book Title 2</h2>
          </div>
          <div className="bg-gray-700 p-4 rounded-lg shadow-lg transition-transform transform hover:scale-105">
            <img src={book3} alt="Book 3" className="w-full h-64 object-cover rounded-md mb-2" />
            <h2 className="font-bold text-xl">Book Title 3</h2>
          </div>
          {/* Add more book images here */}
        </div>
      </div>
    </div>
  );
};

export default Dashboared;
