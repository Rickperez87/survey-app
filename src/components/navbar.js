import React, { useState } from "react";
import Login from "./login";
import UserNameDialog from "./userNameDialog";
import { withStyles } from "@material-ui/core/styles";
import "../styles/navbar.css";

const styles = {
  root: {
    background: "rgba(63,81,181,.87)",
    display: "flex",
    alignItems: "center",
    color: "#FAFAFA",
    height: "2rem",
    padding: "1rem",
    fontWeight: "400",
    fontSize: "16px",
    fontFamily: "Poppins, sans-serif",
  },
};

function Navbar({ classes, userName, setUserName }) {
  //add logic to check if user name is unique and to pool together all user names from clients
  const [openNameInput, setNameInputOpen] = useState(true);
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
    <div className={classes.root}>
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

export default withStyles(styles)(Navbar);
