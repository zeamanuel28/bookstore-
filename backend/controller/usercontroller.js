import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { addUser, findUserByEmail } from '../model/usermodel.js'; // Ensure to include the .js extension

// Signup Controller
const signup = async (req, res) => {
  console.log(req.body);
  const { name, email, password } = req.body;
  console.log(name, email, password);

  try {
    // Check if the username already exists
    const userExist = await findUserByEmail(name); // You should check email instead of name here
    if (userExist) {
      return res.status(400).json({ message: `The username ${name} is already in use!` });
    }

    // Hash the password before saving the user
    const hashedPassword = await bcrypt.hash(password, 10);

    // Add a new user
    const newUser = await addUser(name, email, hashedPassword);
    res.status(200).json({ message: 'Signup Successful', user: newUser });
  } catch (err) {
    res.status(400).json({ message: 'Signup Failed', error: err.message });
  }
};

// Login Controller
const login = async (req, res) => {
  const { email,name} = req.body;

  try {
    const user = await findUserByEmail(email);

    if (!user ) {
      return res.status(400).json({ message: 'Invalid credentials!' });
    }
    const accessToken = jwt.sign({ id: user.id, isAdmin: user.isAdmin }, 'mysecretkey', { expiresIn: '20m' });
    const refreshToken = jwt.sign({ id: user.id, isAdmin: user.isAdmin }, 'myrefreshkey', { expiresIn: '7d' });

    // Send the tokens in the response
    return res.status(200).json({ message: 'Login successful!', accessToken, refreshToken, name });

  } catch (error) {
    return res.status(500).json({ message: 'Error occurred during login!', error: error.message });
  }
};

// Refresh Token Controller
const refreshToken = (req, res) => {
  const { token } = req.body;
  if (!token) return res.status(401).json({ message: 'Token missing!' });

  jwt.verify(token, 'myrefreshkey', (err, user) => {
    if (err) return res.status(403).json({ message: 'Invalid refresh token!' });

    // Generate a new access token
    const newAccessToken = jwt.sign({ id: user.id, isAdmin: user.isAdmin }, 'mysecretkey', { expiresIn: '20m' });

    // Send the new access token
    res.json({ accessToken: newAccessToken });
  });
};

// Export functions using ES module syntax
export { signup, login, refreshToken };
