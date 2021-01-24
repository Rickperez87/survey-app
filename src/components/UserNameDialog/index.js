import React, { useState, useEffect } from "react";
import DialogContentText from "@material-ui/core/DialogContentText";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import useFormState from "../../custom-react-hooks/form-state-hook";
import DialogActions from "@material-ui/core/DialogActions";
import { withStyles } from "@material-ui/core/styles";
import DialogContent from "@material-ui/core/DialogContent";
import Input from "@material-ui/core/Input";
import Button from "@material-ui/core/Button";
import socket from "../../server/socketConfig";

const styles = {
  root: {
    width: "100%",
  },
  content: {
    width: "100%",
    padding: 0,
  },
  header: {
    color: "#2f3542",
    padding: 0,
    paddingTop: 0,
    marginBottom: ".25rem",
    fontSize: "1rem",
  },
  input: {
    margin: ".5rem 0",
    background: "#f5f6fa",
    padding: ".25rem",
  },

  paper: {
    minWidth: "20vw",
    minHeight: "20vh",
    padding: "1rem",
  },
};

function UserNameDialog({ classes, setUserName, onClose, open }) {
  const [inputName, changeInputName, clearInputName] = useFormState("");
  const [userNameIsUnique, setUserNameIsUnique] = useState(true);

  const capitalizeFirstLetter = (str) => {
    if (str.length > 2) {
      str = str.slice().toLowerCase();
      return str[0].toUpperCase() + str.slice(1);
    } else return str;
  };

  const handleSubmit = () => {
    socket.emit("newUser", inputName);
  };

  useEffect(() => {
    console.log(capitalizeFirstLetter(inputName));
    socket.on("uniqueUserName", function () {
      setUserNameIsUnique(true);
      setUserName(() => capitalizeFirstLetter(inputName));
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
        className={classes.root}
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
          <DialogTitle className={classes.header} id="Enter-Name-dialog-title">
            Enter Your Name
          </DialogTitle>

          <DialogContent className={classes.content}>
            <Input
              className={classes.input}
              autoFocus
              fullWidth
              margin="dense"
              placeholder="Name"
              inputProps={{ "aria-label": "description" }}
              value={inputName}
              disableUnderline
              onChange={changeInputName}
            />
            {!userNameIsUnique && (
              <DialogContentText color="secondary">
                Name Must Be Unique!
              </DialogContentText>
            )}
          </DialogContent>
        </form>
        <DialogActions style={{ padding: 0 }}>
          <Button
            className={classes.button}
            type="submit"
            color="primary"
            variant="contained"
            onClick={handleSubmit}
          >
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
export default withStyles(styles)(UserNameDialog);
