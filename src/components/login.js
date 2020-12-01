import React from "react";
import socket from "../socketConfig";
import useFormState from "../custom-react-hooks/form-state-hook";
import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";
import Input from "@material-ui/core/Input";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import "../styles/survey.css";

const styles = {
  root: {},
  loginContainer: {},
};

function Login({ classes, onClose, open }) {
  const [user, updateUser, clearUser] = useFormState("");
  const [pass, updatePass, clearPass] = useFormState("");

  const login = function () {
    socket.emit("login", [user, pass]);
    clearUser();
    clearPass();
    onClose();
  };
  return (
    <Dialog
      fullWidth="md"
      maxWidth="md"
      onClose={onClose}
      aria-labelledby="login-dialog-title"
      open={open}
      className={classes.loginContainer}
    >
      <DialogTitle id="login-dialog-title">Host Login</DialogTitle>
      <Input placeholder="User" value={user} onChange={updateUser} />
      <Input placeholder="Password" value={pass} onChange={updatePass} />
      <Button
        color="primary"
        className={classes.root}
        variant="contained"
        onClick={login}
      >
        Login
      </Button>
    </Dialog>
  );
}

export default withStyles(styles)(Login);
