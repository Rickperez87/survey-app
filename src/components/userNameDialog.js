import React from "react";
import DialogContentText from "@material-ui/core/DialogContentText";
import Dialog from "@material-ui/core/Dialog";
import useFormState from "../custom-react-hooks/form-state-hook";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import DialogContent from "@material-ui/core/DialogContent";
import TextField from "@material-ui/core/TextField";

export default function UserNameDialog({ setUserName, onClose, open }) {
  const [inputName, changeInputName, clearInputName] = useFormState("");

  const handleSubmit = () => {
    setUserName(inputName);
    onClose();
    clearInputName();
  };

  return (
    <div>
      <Dialog
        onClose={onClose}
        aria-labelledby="Enter-Name-dialog-title"
        open={open}
      >
        <DialogContent>
          <DialogContentText id="Enter-Name-dialog-title">
            Enter Your Name
          </DialogContentText>
          <TextField
            fullWidth
            margin="dense"
            placeholder="Name"
            inputProps={{ "aria-label": "description" }}
            value={inputName}
            onChange={changeInputName}
          />
        </DialogContent>
        <DialogActions>
          <Button variant="contained" color="primary" onClick={handleSubmit}>
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
