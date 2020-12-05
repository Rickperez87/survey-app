import React from "react";
import socket from "../server/socketConfig";
import useFormState from "../custom-react-hooks/form-state-hook";
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
      fullWidth="sm"
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
          value={user}
          onChange={updateUser}
        />
        <br />
        <TextField
          margin="dense"
          fullWidth
          placeholder="Password"
          value={pass}
          onChange={updatePass}
        />
      </DialogContent>
      <DialogActions>
        <Button
          color="primary"
          className={classes.root}
          variant="contained"
          onClick={login}
        >
          Login
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default withStyles(styles)(Login);
