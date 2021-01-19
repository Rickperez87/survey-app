import React, { useState } from "react";
import Login from "./Login";
import UserNameDialog from "../UserNameDialog";
import { withStyles } from "@material-ui/core/styles";
import userIcon from "./userNameIcon.svg";

const styles = {
  root: {
    background: "rgba(63,81,181,.87)",
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    color: "#FAFAFA",
    height: "2rem",
    padding: "1rem 4rem",
    fontWeight: "500",
    fontSize: "1.2rem",
    fontFamily: "Poppins, sans-serif",
  },
  userIcon: {
    margin: "0 .6rem 0 1.6rem",
  },
  userName: {
    "&:hover": {
      cursor: "pointer",
    },
  },
  logo: {
    fontWeight: "bold",

    "@media (max-width:575px)": { display: "none" },
  },
  loginContainer: {
    display: "flex",
    alignItems: "center",
    "&:hover": {
      cursor: "pointer",
    },
  },
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
    <>
      <div className={classes.root}>
        <div className={classes.logo}>Survey~RP</div>
        <div className={classes.loginContainer}>
          <div className={classes.login} onClick={handleLoginOpen}>
            Host Login
          </div>
          <div className={classes.userName} onClick={handleInputNameOpen}>
            <img className={classes.userIcon} src={userIcon}></img>
            {userName}
          </div>
        </div>
      </div>
      <Login open={openLogin} onClose={handleLoginClose} />
      <UserNameDialog
        setUserName={setUserName}
        open={openNameInput}
        onClose={handleInputNameClose}
      />
    </>
  );
}

export default withStyles(styles)(Navbar);
