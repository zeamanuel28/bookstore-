import React, { useState } from 'react';
import { useSignupMutation } from '../features/auth/authApi';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [signup, { isLoading, isError, error }] = useSignupMutation();
  const navigate = useNavigate();

  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [nameError, setNameError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password) => {
    const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/;
    return strongPasswordRegex.test(password);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const handleSignup = async () => {
    setEmailError('');
    setPasswordError('');
    setNameError('');
    setConfirmPasswordError('');

    if (!name) {
      setNameError('Please fill in your name.');
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

    if (password !== confirmPassword) {
      setConfirmPasswordError('Passwords do not match.');
      return;
    }

    const formData = new FormData();
    formData.append('name', name);
    formData.append('email', email);
    formData.append('password', password);
    if (image) {
      formData.append('image', image);
    }

    try {
      const user = await signup(formData).unwrap();
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

        {/* Circular Image Upload */}
        <div className="flex justify-center mb-4 relative">
          <div className="relative w-32 h-32">
            {imagePreview ? (
              <img
                src={imagePreview}
                alt="Profile"
                className="w-full h-full object-cover rounded-full"
              />
            ) : (
              <div className="w-full h-full bg-gray-200 rounded-full flex items-center justify-center">
                <span className="text-4xl text-gray-400">+</span>
              </div>
            )}
          </div>
          {/* Plus Sign Below the Circle */}
          <label
            htmlFor="imageUpload"
            className="absolute left-1/2 transform -translate-x-1/2 translate-y-1/2 text-blue-600 cursor-pointer text-4xl hover:text-blue-800"
          >
            +
            <span className="absolute text-sm text-gray-600 bg-gray-100 p-1 rounded-lg opacity-0 transition-opacity hover:opacity-100">
              Add Image
            </span>
          </label>
          <input
            id="imageUpload"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="hidden"
          />
        </div>

        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
          className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {nameError && <p className="text-red-600 mb-2">{nameError}</p>}

        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {emailError && <p className="text-red-600 mb-2">{emailError}</p>}

        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {passwordError && <p className="text-red-600 mb-2">{passwordError}</p>}

        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="Confirm Password"
          className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {confirmPasswordError && <p className="text-red-600 mb-2">{confirmPasswordError}</p>}

        <button
          onClick={handleSignup}
          disabled={isLoading}
          className={`w-full p-3 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition duration-200 ease-in-out ${
            isLoading ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          {isLoading ? 'Signing up...' : 'Signup'}
        </button>
        {isError && (
          <p className="mt-4 text-red-600 text-center">{error?.data?.message || 'Signup failed. Please try again.'}</p>
        )}
      </div>
    </div>
  );
};

export default Signup;
