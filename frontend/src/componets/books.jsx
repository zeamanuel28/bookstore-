import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for redirection
import book1 from '../assets/book1.jpg';
import book2 from '../assets/book2.jpg';
import book3 from '../assets/book3.jpg';
import book4 from '../assets/book4.jpg';
import book5 from '../assets/book5.jpg';
import book6 from '../assets/book6.jpg';
import fiker from '../assets/fiker.jpg';
import temsalet from '../assets/temsalet.png';
import ethiopian from '../assets/ethiopian.jpg';
import Wife from '../assets/Wife.jpg';

const Books = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [favorites, setFavorites] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null); // State for the selected book
  const [isModalOpen, setIsModalOpen] = useState(false); // State for modal visibility
  const navigate = useNavigate(); // Initialize useNavigate for navigation

  const books = [
    { id: 0, title: 'Wife', author: 'unknown', publishedDate: '1990', image: Wife },
    { id: 0, title: 'Ethiopian History', author: 'unknown', publishedDate: '1990', image: ethiopian },
    { id: 1, title: 'Temsalet', author: 'unknown', publishedDate: '1990', image: temsalet },
    { id: 2, title: 'Fiker Eske mekaber', author: 'Haddis Alemayew', publishedDate: '1968', image: fiker },
    { id: 3, title: 'Book Title 1', author: 'Author 1', publishedDate: '2020', image: book1 },
    { id: 4, title: 'Book Title 2', author: 'Author 2', publishedDate: '2021', image: book2 },
    { id: 5, title: 'Book Title 3', author: 'Author 3', publishedDate: '2019', image: book3 },
    { id: 6, title: 'Book Title 4', author: 'Author 4', publishedDate: '2018', image: book4 },
    { id: 7, title: 'Book Title 5', author: 'Author 5', publishedDate: '2017', image: book5 },
    { id: 8, title: 'Book Title 6', author: 'Author 6', publishedDate: '2022', image: book6 },
  ];

  // Load favorites from localStorage
  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
    setFavorites(storedFavorites);
  }, []);

  const filteredBooks = books.filter(book =>
    book.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const addToFavorites = (book) => {
    const updatedFavorites = [...favorites, book];
    setFavorites(updatedFavorites);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    navigate('/favorites'); // Navigate to the Favorites page
  };

  const viewDetails = (book) => {
    setSelectedBook(book);
    setIsModalOpen(true); // Open the modal when View Details is clicked
  };

  const closeModal = () => {
    setIsModalOpen(false); // Close the modal
    setSelectedBook(null); // Clear the selected book
  };

  return (
    <div className="min-h-screen flex flex-col bg-blue-800 text-white p-8">
      <h1 className="text-4xl font-bold mb-6">Books</h1>

      <div className="mb-6 flex justify-center">
        <div className="relative w-full max-w-xs">
          <input
            type="text"
            placeholder="Search by title..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-3 rounded-lg bg-gray-700 border border-gray-500"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredBooks.length > 0 ? (
          filteredBooks.map(book => (
            <div key={book.id} className="bg-gray-700 p-4 rounded-lg shadow-lg">
              <img src={book.image} alt={book.title} className="w-full h-64 object-cover rounded-md mb-2" />
              <h2 className="font-bold text-xl">{book.title}</h2>
              <button
                className="mt-2 w-full p-2 bg-blue-600 text-white rounded-lg"
                onClick={() => viewDetails(book)}
              >
                View Details
              </button>
              <button
                className="mt-2 w-full p-2 bg-green-600 text-white rounded-lg"
                onClick={() => addToFavorites(book)}
              >
                Add to Favorites
              </button>
            </div>
          ))
        ) : (
          <p className="text-gray-300">No books found.</p>
        )}
      </div>

      {/* Modal for book details */}
      {isModalOpen && selectedBook && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-gray-800 p-8 rounded-lg w-full max-w-md">
            <h2 className="text-3xl font-bold mb-4">{selectedBook.title}</h2>
            <p className="mb-2">Author: {selectedBook.author}</p>
            <p className="mb-2">Published Date: {selectedBook.publishedDate}</p>
            <img src={selectedBook.image} alt={selectedBook.title} className="w-full h-64 object-cover rounded-md mb-4" />
            <button
              className="mt-2 w-full p-2 bg-red-600 text-white rounded-lg"
              onClick={closeModal}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Books;
