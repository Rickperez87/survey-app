import React, { useState } from "react";
import Login from "./Login";
import UserNameDialog from "../UserNameDialog";
import { withStyles } from "@material-ui/core/styles";
import userIcon from "./userNameIcon.svg";

const styles = {
  root: {
    background: "#0984e3",
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    color: "#FAFAFA",
    height: "3.2rem",
    padding: "1.6rem 6.4rem 1.6rem 1.6rem",
    fontWeight: "500",
    fontSize: "1.9rem",
    fontFamily: "Poppins, sans-serif",
    "@media (max-width:600px)": { padding: 0 },
  },
  userIcon: {
    margin: "0 1rem 0 2.6rem",
    width: "100%",
    height: "100%",
    "@media (max-width:600px)": { margin: "0 .4rem 0 1rem" },
  },
  userName: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    height: "2.4rem",
    "&:hover": {
      cursor: "pointer",
    },
  },
  nameText: {
    whiteSpace: "nowrap",
  },
  logo: {
    fontWeight: "bold",
    marginRight: "auto",

    // "@media (max-width:575px)": { display: "none" },
  },
  loginContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
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
            <span className={classes.nameText}>{userName}</span>
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
