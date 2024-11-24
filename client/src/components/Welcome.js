import React from "react";
import { Link } from "react-router-dom";

const Welcome = () => {
  return (
    <div className="container">
      <h1 className="heading">Welcome to Careibu!</h1>
      <p className="paragraph">Please choose an option below:</p>
      {/* Register and Login buttons with links to the register and login pages */}
      <div className="button-container">
        <Link to="/register">
          <button className="button" aria-label="Register page">
            Register
          </button>
        </Link>
        <Link to="/login">
          <button className="button" aria-label="Login page">
            Login
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Welcome;
