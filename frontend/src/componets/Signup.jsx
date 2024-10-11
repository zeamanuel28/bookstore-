import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSignupMutation } from '../service/auth/AuthApi'; // Import the hook

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [nameError, setNameError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const navigate = useNavigate();
  const [signup] = useSignupMutation(); // Use the signup mutation

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const validatePassword = (password) => /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/.test(password);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.match('image.*')) {
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
    } else {
      alert('Please upload a valid image file.');
    }
  };

  const resetImage = () => {
    setImage(null);
    setImagePreview(null);
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setEmailError('');
    setPasswordError('');
    setNameError('');
    setConfirmPasswordError('');
    setIsError(false);
    setErrorMessage('');

    // Validate inputs
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

    // Prepare form data
    const formData = {
      name,
      email,
      password,
      // You might need to handle the image upload differently if required by your backend.
      // image, // Uncomment if you're sending the image
    };

    setIsLoading(true);

    try {
      const user = await signup(formData).unwrap(); // Unwrap to handle the response
      localStorage.setItem('user', JSON.stringify({ name: user.name, email: user.email }));
      navigate('/login'); // Navigate to login on success
    } catch (err) {
      setIsError(true);
      setErrorMessage(err.data?.message || 'An error occurred.'); // Adjust based on your API error structure
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-purple-600">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-sm w-full">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Signup</h2>

        {/* Circular Image Upload */}
        <div className="flex justify-center mb-4 relative">
          <div className="relative w-32 h-32 border-4 border-blue-500 rounded-full">
            {imagePreview ? (
              <>
                <img
                  src={imagePreview}
                  alt="Profile"
                  className="w-full h-full object-cover rounded-full"
                />
                <button
                  onClick={resetImage}
                  aria-label="Reset Image"
                  className="absolute bottom-0 right-0 bg-red-500 text-white p-1 rounded-full"
                >
                  ✕
                </button>
              </>
            ) : (
              <>
                <label
                  htmlFor="imageUpload"
                  className="absolute left-1/2 transform -translate-x-1/2 translate-y-1/2 text-blue-600 cursor-pointer text-4xl hover:text-blue-800"
                  aria-label="Add Image"
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
              </>
            )}
          </div>
        </div>

        <form onSubmit={handleSignup}>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Name"
            aria-label="Name"
            className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {nameError && <p className="text-red-600 mb-2">{nameError}</p>}

          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            aria-label="Email"
            className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {emailError && <p className="text-red-600 mb-2">{emailError}</p>}

          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            aria-label="Password"
            className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {passwordError && <p className="text-red-600 mb-2">{passwordError}</p>}

          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm Password"
            aria-label="Confirm Password"
            className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {confirmPasswordError && <p className="text-red-600 mb-2">{confirmPasswordError}</p>}

          <button
            type="submit"
            disabled={isLoading}
            className={`w-full p-3 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition duration-200 ease-in-out ${
              isLoading ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {isLoading ? 'Signing up...' : 'Signup'}
          </button>
          {isError && (
            <p className="mt-4 text-red-600 text-center">{errorMessage}</p>
          )}

          {/* Navigate to Login page */}
          <p className="mt-4 text-center">
            Already have an account?{' '}
            <button
              onClick={() => navigate('/login')}
              className="text-blue-600 hover:underline"
            >
              Login here
            </button>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signup;
