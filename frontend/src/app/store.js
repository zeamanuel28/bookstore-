// // app/store.js
// import { configureStore } from '@reduxjs/toolkit';
// import { authApi } from '..features/auth/authApi';

// export const store = configureStore({
//   reducer: {
//     [authApi.reducerPath]: authApi.reducer, // Add the authApi reducer
//   },
//   middleware: (getDefaultMiddleware) =>
//     getDefaultMiddleware().concat(authApi.middleware), // Add the authApi middleware
// });
