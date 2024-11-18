// Import required packages
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('./models/User'); // Check this path is correct
const coursesRouter = require('./routers/courses'); // Check this path is correct

// Load environment variables from the .env file
dotenv.config();

const app = express();

// Middleware setup
app.use(express.json());
app.use(cors({
    origin: 'http://localhost:3000', // Adjust origin as needed
}));
app.use(bodyParser.json());

// MongoDB connection string from the environment variable
const dbURI = process.env.MONGO_URI;

// Connect to MongoDB using Mongoose
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB Atlas!'))
    .catch((err) => {
        console.error('Database connection error:', err);
        process.exit(1);
    });

// Authentication Middleware
const authenticate = (req, res, next) => {
    const token = req.header('Authorization');
    if (!token) {
        return res.status(403).json({ message: 'Access Denied: No token provided' });
    }

    try {
        const tokenWithoutBearer = token.split(' ')[1]; // Extract token from 'Bearer <token>'
        const verified = jwt.verify(tokenWithoutBearer, process.env.JWT_SECRET);
        req.user = verified;
        next();
    } catch (err) {
        res.status(401).json({ message: 'Invalid Token' });
    }
};

// Middleware to check if the user is an admin
const isAdmin = (req, res, next) => {
    if (req.user.role !== 'admin') {
        return res.status(403).json({ message: 'Access Denied: You are not an admin' });
    }
    next();
};

// Route: Get user profile
app.get('/api/users/me', authenticate, async (req, res) => {
    try {
        const user = await User.findById(req.user.userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(user);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});

// Route: Get user's enrolled courses
app.get('/api/users/me/courses', authenticate, async (req, res) => {
    try {
        const user = await User.findById(req.user.userId).populate('enrolledCourses');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(user.enrolledCourses);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});

// Route: Register user
app.post('/api/register', async (req, res) => {
    const { name, email, password } = req.body;

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            name,
            email,
            password: hashedPassword,
        });

        await newUser.save();

        const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.status(201).json({ token });
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});

// Route: User login
app.post('/api/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ token });
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});

// Route: Delete user (admin-only)
app.delete('/api/users/:id', authenticate, isAdmin, async (req, res) => {
    try {
        const deletedUser = await User.findByIdAndDelete(req.params.id);
        if (!deletedUser) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json({ message: 'User deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});

// Route: Refresh token (implementation depends on your setup)
app.post('/api/refresh-token', async (req, res) => {
    const { refreshToken } = req.body;
    if (!refreshToken) {
        return res.status(400).json({ message: 'Refresh token is required' });
    }

    try {
        const verified = jwt.verify(refreshToken, process.env.JWT_SECRET);
        const newAccessToken = jwt.sign({ userId: verified.userId }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ accessToken: newAccessToken });
    } catch (err) {
        res.status(400).json({ message: 'Invalid refresh token' });
    }
});

// Start the server
app.listen(5001, () => {
    console.log('Server is running on port 5001');
});
