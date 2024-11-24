import React, { useEffect, useState } from "react";
import LogoutButton from "./LogoutButton";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  // States to hold the user email and name
  const [userEmail, setUserEmail] = useState("");
  const [userName, setUserName] = useState("");

  // Initialize navigate function
  const navigate = useNavigate();

  // Fetch the user data stored locally when component mounts
  useEffect(() => {
    // Get the local storage values, for display in dashboard
    const storedEmail = localStorage.getItem("userEmail");
    const storedUserName = localStorage.getItem("userName");

    // If user data exists in localStorage, update the state
    if (storedEmail && storedUserName) {
      setUserEmail(storedEmail);
      setUserName(storedUserName);
    } else {
      // Redirect to login page if not logged in
      navigate("/login");
    }
    // Empty dependency array ensures that this code runs only once when the component mounts
  }, [navigate]);

  return (
    <div className="container">
      <h1 className="heading">Welcome to the Careibu Community {userName}!</h1>
      <p className="paragraph">
        You are registered with your email account of {userEmail}
      </p>
      <p className="paragraph">Have a great journey with us!</p>
      <div className="button-back-logout">
        <LogoutButton />
      </div>
    </div>
  );
}
