// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './componets/Home'; // Import Home component
import Login from './componets/Login';
import Signup from './componets/Signup';
import Logout from './componets/Logout';
import Dashboared from './componets/Dashboared';
import ForgetPassword from './componets/ForgotPassword';
import 'animate.css';


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} /> {/* Home route */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboared" element={<Dashboared />} />
        <Route path="/logout" element={<Logout />} />
        <Route path='forgotpassword' element={<ForgetPassword />} />
      </Routes>
    </Router>
  );
};

export default App;
