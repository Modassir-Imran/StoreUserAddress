const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config(); // Add this line to load environment variables

const userRoutes = require('./routes/user.routes');
const connectDB = require('./config/db');

const app = express();

const PORT = process.env.PORT || 8000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use('/api/v1', userRoutes);

// Start server and connect to MongoDB
const startServer = async () => {
    try {
        await connectDB(); // Use the imported connectDB function
        app.listen(PORT, () => {
            console.log(`Server is running on ${PORT}`);
        });
    } catch (error) {
        console.error('Failed to start server:', error);
    }
};

startServer();