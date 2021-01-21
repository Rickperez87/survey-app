import React, { useState } from "react";
import socket from "../../../server/socketConfig";
import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";
import Input from "@material-ui/core/Input";
import DialogContent from "@material-ui/core/DialogContent";
import { withStyles } from "@material-ui/core/styles";
import Divider from "@material-ui/core/Divider";
import StyledButton from "../../../Styled/Button";
import DialogActions from "@material-ui/core/DialogActions";

const styles = {
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "center",
    width: "100%",
  },
  inputTitle: {
    marginTop: "1rem",
    marginBottom: 0,
    background: "#f5f6fa",
    padding: ".5rem",
  },
  inputPassword: {
    margin: "0 0 1rem 0",
    background: "#f5f6fa",
    padding: ".5rem",
  },
  title: {
    textAlign: "start",
    padding: 0,
    margin: 0,
  },
  paper: {
    minWidth: "20vw",
    maxWidth: "40vw",
    padding: "2rem",
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
      <Divider className={classes.divider} variant="fullWidth" />
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
