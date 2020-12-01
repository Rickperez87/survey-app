import React, { useState } from "react";
import UserNameDialog from "./userNameDialog";
import "../styles/navbar.css";

function Navbar({ handleLogin }) {
  const uniqueId = function () {
    return Math.floor(Math.random() * 1000);
  };
  //add logic to check if user name is unique and to pool together all user names from clients
  const [userName, setUserName] = useState(`user ${uniqueId()}`);
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value) => {
    setOpen(false);
  };

  return (
    <div className="navbar">
      <div className="logo">Survey-App</div>
      <div className="login-container" onClick={handleLogin}>
        Host Login
      </div>
      <div
        className="userName"
        onClick={handleClickOpen}
      >{`Name: ${userName}`}</div>

      <UserNameDialog
        setUserName={setUserName}
        open={open}
        onClose={handleClose}
      />
    </div>
  );
}

export default Navbar;
