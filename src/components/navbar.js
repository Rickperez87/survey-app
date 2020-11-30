import React from "react";
import "../styles/navbar.css";

function Navbar({ handleLogin }) {
  console.log("navbar");
  return (
    <div className="navbar">
      <div className="logo">Survey-App</div>
      <div className="login-container" onClick={handleLogin}>
        Host Login
      </div>
    </div>
  );
}

export default Navbar;
