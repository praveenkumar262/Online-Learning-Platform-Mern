const express = require('express');
const router = express.Router();
const User = require('../models/User');  // Ensure User model is correctly imported

// Registration route
router.post('/register', async (req, res) => {
    console.log('Received registration request');  // Log to confirm request is coming to the backend
    try {
        const { name, email, password, type } = req.body;

        console.log('Request body:', req.body);  // Log the received data

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            console.log('User already exists:', email);  // Log if user is already in the database
            return res.status(400).json({
                success: false,
                message: 'User with this email already exists'
            });
        }

        // User creation logic
        const newUser = new User({ name, email, password, type });
        await newUser.save();

        console.log('New user created:', newUser);  // Log the new user creation

        res.status(201).json({
            success: true,
            message: 'User registered successfully',
        });

    } catch (error) {
        console.error('Error during registration:', error);  // Log any errors
        res.status(500).json({
            success: false,
            message: 'Server error. Please try again later.',
        });
    }
});

// Login route (Example)
router.post('/login', async (req, res) => {
    console.log('Received login request');  // Log to confirm login request is coming through
    try {
        const { email, password } = req.body;
        
        // Find the user by email
        const user = await User.findOne({ email });
        if (!user) {
            console.log('User not found:', email);  // Log if user is not found
            return res.status(400).json({
                success: false,
                message: 'User not found'
            });
        }

        // Verify password (You should hash and compare passwords in real-world scenarios)
        if (user.password !== password) {
            console.log('Incorrect password attempt for:', email);  // Log incorrect password attempt
            return res.status(400).json({
                success: false,
                message: 'Incorrect password'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Login successful',
            user: { name: user.name, email: user.email }  // Send user details in the response
        });

    } catch (error) {
        console.error('Error during login:', error);  // Log any errors
        res.status(500).json({
            success: false,
            message: 'Server error. Please try again later.',
        });
    }
});

module.exports = router;
