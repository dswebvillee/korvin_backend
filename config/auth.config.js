require('dotenv').config(); // Load environment variables from .env file
module.exports = {
    secret: process.env.JWT_SECRET // Replace 'your_secret_key_here' with your actual secret key
};
