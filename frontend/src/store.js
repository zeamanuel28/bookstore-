// store.js
import { configureStore } from '@reduxjs/toolkit';
import { booksApi } from './features/books/booksApi'; // Import the API
import authReducer from './features/auth/authSlice'; // Import other slices if you have them

const store = configureStore({
  reducer: {
    [booksApi.reducerPath]: booksApi.reducer, // Add the booksApi reducer
    auth: authReducer, // Example of another slice (optional)
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(booksApi.middleware), // Add the RTK Query middleware
});

export default store;
