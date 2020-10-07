import React from "react";
import "../styles/navbar.css";

function Navbar(props) {
  const { toggleLoginLink } = props;
  return (
    <div className="navbar">
      <div className="logo">Survey-App</div>
      <div className="login-container" onClick={toggleLoginLink}>
        Host Login
      </div>
    </div>
  );
}

export default Navbar;
