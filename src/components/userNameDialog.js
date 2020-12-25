import React, { useState, useEffect } from "react";
import DialogContentText from "@material-ui/core/DialogContentText";
import Dialog from "@material-ui/core/Dialog";
import useFormState from "../custom-react-hooks/form-state-hook";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";
import DialogContent from "@material-ui/core/DialogContent";
import TextField from "@material-ui/core/TextField";
import socket from "../server/socketConfig";

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
  paper: {
    minWidth: "20vw",
    maxWidth: "40vw",
  },
};

function UserNameDialog({ classes, setUserName, onClose, open }) {
  const [inputName, changeInputName, clearInputName] = useFormState("");
  const [userNameIsUnique, setUserNameIsUnique] = useState(true);

  const handleSubmit = () => {
    socket.emit("newUser", inputName);
  };

  useEffect(() => {
    socket.on("uniqueUserName", function () {
      setUserNameIsUnique(true);
      setUserName(inputName);
      clearInputName();
      onClose();
    });
  }, [inputName]);

  useEffect(() => {
    socket.on("duplicateUserName", function () {
      setUserNameIsUnique(false);
    });
  }, [inputName]);

  return (
    <div>
      <Dialog
        onClose={onClose}
        aria-labelledby="Enter-Name-dialog-title"
        open={open}
        classes={{ paper: classes.paper }}
      >
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
        >
          <DialogContent className={classes.root}>
            <DialogContentText id="Enter-Name-dialog-title">
              Enter Your Name
            </DialogContentText>
            <TextField
              autoFocus
              fullWidth
              margin="dense"
              placeholder="Name"
              inputProps={{ "aria-label": "description" }}
              value={inputName}
              onChange={changeInputName}
            />
            {!userNameIsUnique && (
              <DialogContentText color="secondary">
                Name Must Be Unique!
              </DialogContentText>
            )}
          </DialogContent>
          <DialogActions>
            <Button
              className={classes.button}
              type="submit"
              variant="contained"
              color="primary"
            >
              Submit
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
}
export default withStyles(styles)(UserNameDialog);
