// Import firebase admin skd to register and retrieve user data
const admin = require("../firebaseAdmin");

// Register a new user
const registerUser = async (req, res) => {
  // Get email and password
  const { email, password } = req.body;

  try {
    // Create a new user with Firebase Authentication
    const userRecord = await admin.auth().createUser({
      email,
      password,
    });

    // Response with success message and user record
    res
      .status(201)
      .send({ message: "User registered successfully", user: userRecord });
    // Catch errors and send message
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

// User login verifying the ID token from database
const loginUser = async (req, res) => {
  // Get user token form request
  const { token } = req.body;

  // Check if token exists in the request
  if (!token) {
    return res.status(400).send({ error: "No token provided" });
  }

  try {
    // Verify the ID token using firebase admin SKD
    const decodedToken = await admin.auth().verifyIdToken(token);

    // Get the user from UID decoded token
    const user = await admin.auth().getUser(decodedToken.uid);

    // Response with success message, user UID and email
    res.status(200).send({
      message: "Login successful",
      user: { uid: user.uid, email: user.email },
    });
    // Catch errors and send message
  } catch (error) {
    res.status(500).send({ error: "Failed to verify token" });
  }
};

// Export the functions to use in routes
module.exports = {
  registerUser,
  loginUser,
};
