// store.js
import { configureStore } from '@reduxjs/toolkit';
import AuthApi from './service/auth/AuthApi'; // Adjust the path as needed

const store = configureStore({
  reducer: {
    AuthApi: authReducer, // Add your reducer(s) here
  },
});

export default store;
