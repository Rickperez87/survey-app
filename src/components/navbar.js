import React, { useState } from "react";
import Login from "./login";
import UserNameDialog from "./userNameDialog";
import { withStyles } from "@material-ui/core/styles";
import userIcon from "../styles/userNameIcon.svg";
import "../styles/navbar.css";

const styles = {
  root: {
    background: "rgba(63,81,181,.87)",
    width: "100%",
    display: "flex",
    alignItems: "center",
    color: "#FAFAFA",
    height: "2rem",
    padding: "1rem",
    fontWeight: "400",
    fontSize: "16px",
    fontFamily: "Poppins, sans-serif",
    justifyContent: "center",
  },
  userIcon: {
    marginRight: "1rem",
  },
  userName: { justifySelf: "flex-end" },
};

function Navbar({ classes, userName, setUserName }) {
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
      <img className={classes.userIcon} src={userIcon}></img>
      <div
        className={classes.userName}
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
