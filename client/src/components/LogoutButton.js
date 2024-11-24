import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
// Import firebase signout method
import { getAuth, signOut } from "firebase/auth";

const LogoutButton = () => {
  const navigate = useNavigate();

  // Define the error state to handle and display error messages
  const [error, setError] = useState("");

  const handleLogout = () => {
    // Clear localStorage data
    localStorage.removeItem("userEmail");
    localStorage.removeItem("userName");

    // Sign out from firebase authentication if the user is signed in
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        // Redirect user to welcome page after sign out
        // Redirect user to welcome page
        navigate("/");
      })
      .catch((error) => {
        setError(
          error,
          "An error occurred while signing out. Please try again."
        );
      });
  };

  return (
    <div>
      {/* Render the error message if there's an error */}
      {error && <p style={{ color: "red" }}>{error}</p>}
      <button onClick={handleLogout} className="button-back-logout">
        Logout
      </button>
    </div>
  );
};

export default LogoutButton;
