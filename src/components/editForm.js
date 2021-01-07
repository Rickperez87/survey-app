import React from "react";
import TextField from "@material-ui/core/TextField";
import { withStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";

const styles = {
  form: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
};

function EditForm({ classes, renderText, handleEdit, toggleEdit }) {
  return (
    <form
      className={classes.form}
      onSubmit={(e) => {
        e.preventDefault();
        toggleEdit();
      }}
      style={{ width: "100%" }}
    >
      <TextField
        margin="normal"
        value={renderText}
        name="surveyTitle"
        onChange={(e) => handleEdit(e)}
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
