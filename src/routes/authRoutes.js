const express = require('express');
const router = express.Router();
const { login } = require('../controllers/userController');
const { registerUser } = require('../controllers/userController');
const { body } = require('express-validator');

// Validation middleware for login route
const fieldValidationRules = [
    body('username').notEmpty().withMessage('Username is required'),
    body('password').notEmpty().withMessage('Password is required'),
];

/**
 * @swagger
 * /login:
 *   post:
 *     summary: Authenticate user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Successful login
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 user:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                     username:
 *                       type: string
 *                 token:
 *                   type: string
 *       '400':
 *         description: Invalid request
 *       '404':
 *         description: User not found
 *       '500':
 *         description: Internal server error
 */
router.post('/login', fieldValidationRules, login);

router.post('/registerUser', fieldValidationRules, registerUser);

module.exports = router;
