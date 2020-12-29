import React, { useState } from "react";
import Login from "./login";
import UserNameDialog from "./userNameDialog";
import { withStyles } from "@material-ui/core/styles";
import userIcon from "../styles/userNameIcon.svg";

const styles = {
  root: {
    background: "rgba(63,81,181,.87)",
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    color: "#FAFAFA",
    height: "2rem",
    padding: "1rem",
    fontWeight: "400",
    fontSize: "16px",
    fontFamily: "Poppins, sans-serif",
  },
  userIcon: {
    marginRight: "1rem",
  },
  userName: {
    justifySelf: "flex-end",
    "&:hover": {
      cursor: "pointer",
    },
  },
  logo: {
    fontWeight: "bold",

    "@media (max-width:575px)": { display: "none" },
  },
  loginContainer: {
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
    <div className={classes.root}>
      <div className={classes.logo}>Survey~RP</div>
      <div className={classes.loginContainer} onClick={handleLoginOpen}>
        Host Login
      </div>
      <Login open={openLogin} onClose={handleLoginClose} />
      <div>
        <div className={classes.userName} onClick={handleInputNameOpen}>
          <img className={classes.userIcon} src={userIcon}></img>
          {`Name: ${userName}`}
        </div>
        <UserNameDialog
          setUserName={setUserName}
          open={openNameInput}
          onClose={handleInputNameClose}
        />
      </div>
    </div>
  );
}

export default withStyles(styles)(Navbar);
