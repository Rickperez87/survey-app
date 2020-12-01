import React from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";
import useFormState from "../custom-react-hooks/form-state-hook";
import Input from "@material-ui/core/Input";
import Button from "@material-ui/core/Button";

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
        aria-labelledby="simple-dialog-title"
        open={open}
      >
        <DialogTitle id="simple-dialog-title">Enter Your Name</DialogTitle>
        <List>
          <ListItem>
            <Input
              placeholder="Name"
              inputProps={{ "aria-label": "description" }}
              value={inputName}
              onChange={changeInputName}
            />
          </ListItem>
          <Button variant="contained" color="primary" onClick={handleSubmit}>
            Submit
          </Button>
        </List>
      </Dialog>
    </div>
  );
}
