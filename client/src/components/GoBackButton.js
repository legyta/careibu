import React from "react";
import { useNavigate } from "react-router-dom";

const GoBackButton = () => {
  // Navigate function from react router retrieved
  const navigate = useNavigate();

  // Handling on click event to navigate the user to the welcome page
  const handleGoBack = () => {
    navigate("/");
  };

  return (
    <button
      type="button"
      onClick={handleGoBack}
      className="button-back-logout"
      aria-label="Welcome page"
    >
      Go Back
    </button>
  );
};

export default GoBackButton;
