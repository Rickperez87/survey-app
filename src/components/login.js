import React, { useState } from "react";
import socket from "../server/socketConfig";
import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";
import TextField from "@material-ui/core/TextField";
import DialogContent from "@material-ui/core/DialogContent";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import DialogActions from "@material-ui/core/DialogActions";
import "../styles/survey.css";

const styles = {
  root: {},
  loginContainer: {},
};

function Login({ classes, onClose, open }) {
  const [input, setInput] = useState({
    userName: "",
    password: "",
  });

  function updateInput(e) {
    setInput({ ...input, [e.currentTarget.name]: e.currentTarget.value });
  }
  const handleLogin = function () {
    socket.emit("login", input);
    setInput({ userName: "", password: "" });
    onClose();
  };

  return (
    <Dialog
      fullWidth
      maxWidth="sm"
      onClose={onClose}
      aria-labelledby="login-dialog-title"
      open={open}
      className={classes.loginContainer}
    >
      <DialogTitle id="login-dialog-title">Host Login</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          fullWidth
          placeholder="User"
          name="userName"
          value={input.userName}
          onChange={updateInput}
        />
        <br />
        <TextField
          margin="dense"
          fullWidth
          placeholder="Password"
          name="password"
          value={input.password}
          onChange={updateInput}
        />
      </DialogContent>
      <DialogActions>
        <Button
          color="primary"
          className={classes.root}
          variant="contained"
          onClick={handleLogin}
        >
          Login
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default withStyles(styles)(Login);
