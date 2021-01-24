import React, { useState } from "react";
import socket from "../../../server/socketConfig";
import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";
import Input from "@material-ui/core/Input";
import DialogContent from "@material-ui/core/DialogContent";
import { withStyles } from "@material-ui/core/styles";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";

const styles = {
  root: {
    width: "100%",
  },
  inputTitle: {
    marginTop: ".25rem",
    marginBottom: 0,
    background: "#f5f6fa",
    padding: ".25rem",
  },
  inputPassword: {
    margin: ".5rem 0 .5rem 0",
    background: "#f5f6fa",
    padding: ".25rem",
  },
  title: {
    textAlign: "start",
    padding: 0,
    margin: 0,
  },
  paper: {
    minWidth: "20vw",
    maxWidth: "70vw",
    padding: "1rem",
  },
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
      onClose={onClose}
      aria-labelledby="login-dialog-title"
      open={open}
      classes={{ paper: classes.paper }}
    >
      <DialogTitle className={classes.title} id="login-dialog-title">
        Host Login
      </DialogTitle>
      <DialogContent style={{ padding: 0 }} className={classes.root}>
        <Input
          fullWidth={true}
          autoFocus
          margin="dense"
          placeholder="User"
          name="userName"
          value={input.userName}
          onChange={updateInput}
          classes={{ input: classes.inputTitle }}
          disableUnderline
        />
        <br />
        <Input
          fullWidth={true}
          margin="dense"
          placeholder="Password"
          name="password"
          value={input.password}
          onChange={updateInput}
          classes={{ input: classes.inputPassword }}
          disableUnderline
        />
      </DialogContent>
      <DialogActions style={{ padding: 0 }}>
        <Button variant="contained" color="primary" onClick={handleLogin}>
          Login
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default withStyles(styles)(Login);
