const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const db = require('../../config/db.config');
const { validationResult } = require('express-validator');
const logger = require('../errorLogs/logger');

exports.login = async (req, res) => {
    try {
        // Check for validation errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            // If there are validation errors, return a 400 status with the error details
            return res.status(400).json({ errors: errors.array() });
        }

        const { username, password } = req.body;

        let query = 'SELECT * FROM users';
        db.query(query,async (err, results) => {
            if (err) {
                // If there's an error fetching users, log the error and return a 500 status
                //console.error('Error fetching products:', err);
                logger.error('Error logging in:', err);
                return res.status(500).json({ error: 'Internal server error' });
            }
            
            // Find the user in the results whose username matches the one provided in the request
            const user = results.find((user) => user.username === username);
            
            // If no user is found with the provided username, return a 404 status
            if (!user) {
                return res.status(404).json({ error: 'User not found' });
            }
            
            // Compare the provided password with the hashed password stored in the database
            const validPassword = await bcrypt.compare(password, user.password);
            if (!validPassword) {
                return res.status(400).json({ error: 'Invalid password' });
            }

            // Generate a JWT token for the authenticated user
            const token = generateToken(user.id, user.role);

            // Return a 200 status with the authenticated user's details and the token
            res.status(200).json({ user: { id: user.id, username: user.username }, token });
        });
    } catch (error) {
        //console.error('Error logging in:', error);
        // Log the error using the logger
        logger.error('Error logging in:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

exports.registerUser = async (req, res) => {
    try {
        // Check for validation errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            // If there are validation errors, return a 400 status with the error details
            return res.status(400).json({ errors: errors.array() });
        }
    
        const { username, password } = req.body;

        // Check if the username already exists in the database
        let query = 'SELECT * FROM users';
        db.query(query,async (err, results) => {
            if (err) {
                // If there's an error fetching users, log the error and return a 500 status
                //console.error('Error fetching products:', err);
                logger.error('Error logging in:', err);
                return res.status(500).json({ error: 'Internal server error' });
            }
            
            // Find the user in the results whose username matches the one provided in the request
            const user = results.find((user) => user.username === username);
            
            // If a user with the provided username already exists, return a 400 status
            if (user) {
                return res.status(400).json({ error: 'Username already exists' });
            }
            
            const hashedPassword = await bcrypt.hash(password, 10); // Hash the password with salt rounds
            // Save username and hashed password to the database

            // Save username and hashed password to the database
            await db.query('INSERT INTO users (username, password) VALUES (?, ?)', [username, hashedPassword]);

            // Return a 201 status with a success message
            res.status(201).json({ message: 'User registered successfully' });
        });
    } catch (error) {
        //console.error('Error registering user:', error);
        logger.error('Error logging in:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const generateToken = (userId, role) => {
    return jwt.sign({ userId, role }, 'abff12345dfdf6dfdfdf78dfdfdfdf', { expiresIn: '1h' }); // Token expires in 1 hour
};

