// components/Home.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import bookstoreImage from '../assets/bookstore.jpg'; // Importing the first image
import booksImage from '../assets/bookstore1.jpg'; // Importing the second image
import libraryImage from '../assets/bookstore2.webp'; // Importing the third image
const Home = () => {
  const navigate = useNavigate();
  const [showMoreInfo, setShowMoreInfo] = useState(false); // State to control showing more information

  const handleLogin = () => {
    navigate('/login'); // Navigate to the login page
  };

  const handleSignup = () => {
    navigate('/signup'); // Navigate to the signup page
  };

  const handleLearnMore = () => {
    setShowMoreInfo(!showMoreInfo); // Toggle additional information when clicked
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-indigo-600 via-purple-500 to-pink-500 text-white">
      <div className="flex items-center justify-between w-full px-10">
        {/* Left side: text and buttons */}
        <div className="flex flex-col items-start">
          <h1 className="text-6xl font-extrabold mb-8 animate__animated animate__fadeInDown animate__delay-1s">
            Welcome to the Bookstore
          </h1>
          <p className="text-lg mb-12 text-white text-opacity-80 animate__animated animate__fadeInUp animate__delay-2s">
            Discover your next great read with us!
          </p>

          <div className="flex space-x-8 mt-4">
            <button
              onClick={handleLogin}
              className="bg-white text-blue-700 px-8 py-4 rounded-lg shadow-lg hover:shadow-2xl transition-transform transform hover:scale-110 animate__animated animate__bounceInLeft animate__delay-3s hover:bg-blue-100"
            >
              Login
            </button>
            <button
              onClick={handleSignup}
              className="bg-white text-green-700 px-8 py-4 rounded-lg shadow-lg hover:shadow-2xl transition-transform transform hover:scale-110 animate__animated animate__bounceInRight animate__delay-3s hover:bg-green-100"
            >
              Signup
            </button>
          </div>

          <div className="mt-16 animate__animated animate__fadeInUp animate__delay-4s">
            <button
              className="text-lg font-bold underline text-white opacity-80 hover:opacity-100 transition-opacity"
              onClick={handleLearnMore}
            >
              Learn more about our store
            </button>
          </div>
        </div>

        {/* Right side: overlapping images */}
        <div className="relative w-2/3 h-96 animate__animated animate__zoomIn">
          {/* First image - Top right */}
          <img
            src={bookstoreImage}
            alt="Bookstore"
            className="absolute w-2/5 h-64 object-cover rounded-xl shadow-lg border-4 border-white transform hover:scale-105 hover:rotate-1 transition-transform duration-500 ease-in-out z-30 top-0 right-0"
          />
          {/* Second image - Middle left */}
          <img
            src={booksImage}
            alt="Books"
            className="absolute w-2/5 h-64 object-cover rounded-xl shadow-lg border-4 border-white transform hover:scale-105 hover:rotate-1 transition-transform duration-500 ease-in-out z-20 top-1/4 left-0"
          />
          {/* Third image - Bottom middle */}
          <img
            src={libraryImage}
            alt="Library"
            className="absolute w-2/5 h-64 object-cover rounded-xl shadow-lg border-4 border-white transform hover:scale-105 hover:rotate-1 transition-transform duration-500 ease-in-out z-10 bottom-0 left-1/4"
          />
        </div>
      </div>

      {showMoreInfo && (
        <div className="mt-12 bg-white text-black p-6 rounded-lg shadow-lg max-w-lg animate__animated animate__fadeInUp">
          <h2 className="text-2xl font-bold mb-4">About Our Bookstore</h2>
          <p className="text-md">
            Our bookstore offers a vast collection of books ranging from fiction, non-fiction, educational resources, and more. Whether you're looking for the latest bestseller or a classic novel, we've got something for every reader.
          </p>
          <p className="text-md mt-4">
            We pride ourselves on delivering a personalized and engaging shopping experience, helping you discover your next great read.
          </p>
        </div>
      )}
    </div>
  );
};

export default Home;
