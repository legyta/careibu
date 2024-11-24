// Import express module for HTTP requests
const express = require("express");

// Import the functions for user register and user login, which handle the logic
const { registerUser, loginUser } = require("../controllers/authController");

// Create an express router instanse
const router = express.Router();

// Define post route for user registration
router.post("/register", registerUser);

// Define post route for user login
router.post("/login", loginUser);

// Export the router
module.exports = router;
