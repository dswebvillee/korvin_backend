// Require the Express module
const express = require('express');
const authRoutes = require('./src/routes/authRoutes');
const productRoutes = require('./src/routes/productRoutes');
const swaggerSetup = require('./swagger');

const app = express();
const PORT = process.env.PORT || 3000;

// Add Swagger setup to Express app
swaggerSetup(app);


// Middleware
app.use(express.json());

// Routes
app.use(authRoutes);
app.use(productRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

