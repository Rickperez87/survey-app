import React, { useState } from "react";
import socket from "../../../server/socketConfig";
import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";
import Input from "@material-ui/core/Input";
import DialogContent from "@material-ui/core/DialogContent";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import StyledButton from "../../../Styled/Button";
import DialogActions from "@material-ui/core/DialogActions";

const styles = {
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  input: {
    alignText: "center",
  },
  button: {
    width: "98%",
  },
  title: {
    textAlign: "center",
  },
  paper: {
    minWidth: "20vw",
    maxWidth: "40vw",
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
      <DialogContent className={classes.root}>
        <Input
          fullWidth={true}
          autoFocus
          margin="dense"
          placeholder="User"
          name="userName"
          value={input.userName}
          onChange={updateInput}
          classes={{ input: classes.input }}
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
          classes={{ input: classes.input }}
          disableUnderline
        />
      </DialogContent>
      <DialogActions>
        <StyledButton
          size="wide"
          colorType="primary"
          handleClick={handleLogin}
          label="login"
        />
      </DialogActions>
    </Dialog>
  );
}

export default withStyles(styles)(Login);
