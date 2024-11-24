import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import GoBackButton from "./GoBackButton";

const Register = () => {
  // Setting the hooks for user data, error handling and loading state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // Sending the registration request to the backend
      await axios.post("http://localhost:5000/api/auth/register", {
        email,
        password,
        name,
      });

      // Save user data to localStorage
      localStorage.setItem("userEmail", email);
      localStorage.setItem("userName", name || "User");

      // Navigate to dashboard after successful registration
      navigate("/dashboard");
    } catch (error) {
      setError(error.response?.data?.error || "An unexpected error occurred.");
    } finally {
      // After the request is complete stop the loading
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h2 className="heading">Register</h2>
      <form onSubmit={handleSubmit} className="form">
        <div className="inputGroup">
          <input
            type="text"
            placeholder="Name"
            value={name}
            // Updating the name state when it changes
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div className="inputGroup">
          <input
            type="email"
            placeholder="Email"
            value={email}
            // Updating the email state when it changes
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="inputGroup">
          <input
            type="password"
            placeholder="Password"
            value={password}
            // Updating the password state when it changes
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="button-container">
          <button type="submit" className="button" disabled={loading}>
            {loading ? "Registering..." : "Register"}{" "}
          </button>
          <GoBackButton />
        </div>
      </form>
      {/* Show error or success message */}
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default Register;
