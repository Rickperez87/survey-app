import React from "react";
import "../styles/navbar.css";

function Navbar({ handleClick }) {
  return (
    <div className="navbar">
      <div className="logo">Survey-App</div>
      <div className="login-container" onClick={handleClick}>
        Host Login
      </div>
    </div>
  );
}

export default Navbar;
