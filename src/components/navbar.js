import React, { useState } from "react";
import Login from "./login";
import UserNameDialog from "./userNameDialog";
import "../styles/navbar.css";

function Navbar({ userName, setUserName }) {
  //add logic to check if user name is unique and to pool together all user names from clients
  const [openNameInput, setNameInputOpen] = useState(false);
  const [openLogin, setLoginOpen] = useState(false);

  const handleLoginOpen = () => {
    setLoginOpen(true);
  };

  const handleLoginClose = (value) => {
    setLoginOpen(false);
  };

  const handleInputNameOpen = () => {
    setNameInputOpen(true);
  };

  const handleInputNameClose = (value) => {
    setNameInputOpen(false);
  };

  return (
    <div className="navbar">
      <div className="logo">Survey~RP</div>
      <div className="login-container" onClick={handleLoginOpen}>
        Host Login
      </div>
      <Login open={openLogin} onClose={handleLoginClose} />
      <div
        className="userName"
        onClick={handleInputNameOpen}
      >{`Name: ${userName}`}</div>

      <UserNameDialog
        setUserName={setUserName}
        open={openNameInput}
        onClose={handleInputNameClose}
      />
    </div>
  );
}

export default Navbar;
