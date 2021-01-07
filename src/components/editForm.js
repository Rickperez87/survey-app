import React from "react";
import TextField from "@material-ui/core/TextField";
import { withStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import useFormState from "../custom-react-hooks/form-state-hook";

const styles = {
  form: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
};

function EditForm({ classes, renderText, handleEdit, toggleEdit }) {
  const [val, handleChange, clear] = useFormState(renderText);
  return (
    <form
      className={classes.form}
      onSubmit={(e) => {
        e.preventDefault();
        handleEdit(val);
        toggleEdit();
        clear();
      }}
      style={{ width: "100%" }}
    >
      <TextField
        margin="normal"
        value={val}
        onChange={handleChange}
        fullwidth
        autoFocus
      />
      <IconButton aria-label="Close Edit Button" onClick={toggleEdit}>
        <CloseIcon />
      </IconButton>
    </form>
  );
}

export default withStyles(styles)(EditForm);
