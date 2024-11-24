import React, { useState } from "react";
import { auth, signInWithEmailAndPassword } from "../firebaseConfig";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import GoBackButton from "./GoBackButton";

const Login = () => {
  // Setting the hooks for user data, error handling and loading state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    // When the form is submitted start the loading
    setLoading(true);

    try {
      // Authenticate the user with client side Firebase Authentication
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      // Get the ID token from Firebase Authentication
      const idToken = await user.getIdToken();

      // Send the ID token to the backend for verification
      const response = await axios.post(
        "http://localhost:5000/api/auth/login",
        { token: idToken }
      );

      // Check if the response is successful
      if (response && response.data && response.status === 200) {
        // Save user data to localStorage
        localStorage.setItem("userEmail", email); // Store email in localStorage
        localStorage.setItem("userName", user.displayName || "User");

        // Navigate to dashboard after successful login
        navigate("/dashboard");
      } else {
        setError("Unexpected response from server.");
      }
    } catch (error) {
      // Error handling
      if (axios.isAxiosError(error)) {
        setError(
          "Login failed: " +
            (error.response?.data?.message ||
              error.response?.data?.error ||
              "An unknown error occurred.")
        );
      } else if (error.code === "auth/user-not-found") {
        // Handle Firebase specific errors like wrong credentials
        setError("User not found. Please check your credentials.");
      } else if (error.code === "auth/wrong-password") {
        // Specific Firebase error for wrong password
        setError("Incorrect password. Please try again.");
      } else {
        // General error handling
        setError(
          "Login failed: " + (error.message || "An unexpected error occurred.")
        );
      }
    } finally {
      // After the request is complete stop the loading
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h2 className="heading">Login</h2>
      <form onSubmit={handleSubmit} className="form">
        <div className="inputGroup">
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            // Updating the name state when it changes
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="inputGroup">
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            // Updating the password state when it changes
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="button-container">
          <button type="submit" className="button" disabled={loading}>
            {/* Displaying the loading process if the request is in progress */}
            {loading ? "Logging in..." : "Login"}
          </button>
          <GoBackButton />
        </div>
      </form>
      {/* Show error or success message */}
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default Login;
