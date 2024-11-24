// Import required dependencies

// Express for handling routing
const express = require("express");
// Cors to enable cross-origin requests
const cors = require("cors");
// Authentication routes for defining api endpoints for registration and login
const authRoutes = require("./routes/authRoutes");

// Create express app instance
const app = express();

// Accepting requests from React app running on different port than server
app.use(cors());

// Parsing incoming json requests
app.use(express.json());

// Define routes for authentication
app.use("/api/auth", authRoutes);

// Set the server and listen for requests
const PORT = process.env.PORT || 5000;
app.listen(PORT);
