// // hooks/useAuth.js
// import { useState, useEffect } from 'react';

// const useAuth = () => {
//   const [user, setUser] = useState(null);

//   useEffect(() => {
//     const userData = localStorage.getItem('user');
//     if (userData) {
//       setUser(JSON.parse(userData));
//     }
//   }, []);

//   return user;
// };

// export default useAuth;
