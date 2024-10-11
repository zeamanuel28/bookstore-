// components/Profile.js
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    try {
      const userData = JSON.parse(localStorage.getItem('user'));
      if (!userData) {
        navigate('/login'); // Redirect to login if no user data found
      } else {
        setUser(userData);
        setFormData(userData); // Initialize formData with user data
      }
    } catch (error) {
      console.error('Failed to parse user data:', error);
      navigate('/login'); // Redirect to login on parsing error
    }
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    setUser(formData); // Update user state with new data
    localStorage.setItem('user', JSON.stringify(formData)); // Save updated data to localStorage
    setIsEditing(false);
  };

  return (
    <div className="min-h-screen flex flex-col bg-blue-800 text-white p-8">
      <h1 className="text-4xl font-bold mb-6">Profile</h1>
      {user ? (
        <div className="bg-gray-700 p-6 rounded-lg shadow-lg">
          {isEditing ? (
            <form>
              <div className="mb-4">
                <label className="block mb-2">Name:</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full p-2 rounded"
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2">Email:</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full p-2 rounded"
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2">Phone:</label>
                <input
                  type="text"
                  name="phone"
                  value={formData.phone || ''}
                  onChange={handleChange}
                  className="w-full p-2 rounded"
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2">Address:</label>
                <input
                  type="text"
                  name="address"
                  value={formData.address || ''}
                  onChange={handleChange}
                  className="w-full p-2 rounded"
                />
              </div>
              <button
                type="button"
                onClick={handleSave}
                className="bg-green-500 text-white p-2 rounded"
              >
                Save
              </button>
            </form>
          ) : (
            <>
              <h2 className="text-2xl font-bold mb-2">{user.name}</h2>
              <p className="mb-2">Email: {user.email}</p>
              <p className="mb-2">Phone: {user.phone || 'N/A'}</p>
              <p className="mb-2">Address: {user.address || 'N/A'}</p>
              {user.profilePicture && (
                <img
                  src={user.profilePicture}
                  alt={`${user.name}'s Profile`}
                  className="w-24 h-24 rounded-full mb-4"
                />
              )}
              <button
                onClick={handleEdit}
                className="bg-blue-500 text-white p-2 rounded"
              >
                Edit
              </button>
            </>
          )}
        </div>
      ) : (
        <p className="text-gray-300">Loading user information...</p>
      )}
    </div>
  );
};

export default Profile;
