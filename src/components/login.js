import React from "react";
import socket from "../socketConfig";
import useFormState from "../custom-react-hooks/form-state-hook";
import Input from "@material-ui/core/Input";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import "../styles/survey.css";

const styles = {
  root: {
    background: "grey",
    fontWeight: "bold",
    border: 0,
    borderRadius: 3,
    width: "30 px",
    margin: "1 rem",
  },
};

function Login({ classes, toggleLoginLink }) {
  const [user, updateUser, clearUser] = useFormState("");
  const [pass, updatePass, clearPass] = useFormState("");

  const login = function () {
    socket.emit("login", [user, pass]);
    clearUser();
    clearPass();
    toggleLoginLink();
  };
  return (
    <div className="login-container">
      <h1>Host Login</h1>
      <Input placeholder="User" value={user} onChange={updateUser} />
      <Input placeholder="Password" value={pass} onChange={updatePass} />
      <Button className={classes.root} variant="contained" onClick={login}>
        Login
      </Button>
    </div>
  );
}

export default withStyles(styles)(Login);
