import React, { useState, useEffect } from 'react';

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);

  // Load favorites from localStorage
  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
    setFavorites(storedFavorites);
  }, []);

  // Remove a book from favorites
  const removeFromFavorites = (bookId) => {
    const updatedFavorites = favorites.filter(book => book.id !== bookId);
    setFavorites(updatedFavorites);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
  };

  // Update book rating
  const rateBook = (bookId, rating) => {
    const updatedFavorites = favorites.map(book => {
      if (book.id === bookId) {
        return { ...book, rating };
      }
      return book;
    });
    setFavorites(updatedFavorites);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
  };

  return (
    <div className="min-h-screen flex flex-col bg-blue-800 text-white p-8">
      <h1 className="text-4xl font-bold mb-6">Favorite Books</h1>

      {favorites.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {favorites.map(book => (
            <div key={book.id} className="bg-gray-700 p-4 rounded-lg shadow-lg">
              <img src={book.image} alt={book.title} className="w-full h-64 object-cover rounded-md mb-2" />
              <h2 className="font-bold text-xl">{book.title}</h2>
              <p className="mb-2">Author: {book.author}</p>

              {/* Rating System */}
              <div className="mb-4">
                <p className="mb-2">Rate this book:</p>
                <div className="flex space-x-1">
                  {[1, 2, 3, 4, 5].map(star => (
                    <button
                      key={star}
                      className={`p-2 ${book.rating >= star ? 'text-yellow-400' : 'text-gray-400'}`}
                      onClick={() => rateBook(book.id, star)}
                    >
                      ★
                    </button>
                  ))}
                </div>
                <p className="mt-2">{book.rating ? `You rated this book ${book.rating} out of 5` : 'No rating yet'}</p>
              </div>

              {/* Remove from Favorites Button */}
              <button
                className="mt-2 w-full p-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition duration-200"
                onClick={() => removeFromFavorites(book.id)}
              >
                Remove from Favorites
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-300">No favorite books added yet.</p>
      )}
    </div>
  );
};

export default Favorites;
