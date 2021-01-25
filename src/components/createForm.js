import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Input from "@material-ui/core/Input";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  form: {
    width: "100%",
    border: "1px solid",
    borderRadius: "5px",
  },
  button: {
    display: "inline-block",
    fontSize: ".8rem",
  },
  cancel: {
    cursor: "pointer",
    padding: ".25rem .5rem",
    "&:hover": {
      textDecoration: "underline",
    },
  },
  buttonGroup: {
    display: "flex",
    alignItem: "center",
    justifyContent: "flex-start",
    margin: "1rem 0 .5rem",
  },
}));

function CreateForm({
  formValue,
  updateForm,
  toggleIsActive,
  toggleShowForm,
  inputName,
  placeHolder,
}) {
  const classes = useStyles();

  const handleSubmit = (e) => {
    e.preventDefault();
    toggleIsActive();
    toggleShowForm();
  };

  return (
    <>
      <form
        className={classes.form}
        onSubmit={(e) => {
          handleSubmit(e);
        }}
      >
        <Input
          style={{ display: "block" }}
          className={classes.input}
          name={inputName}
          placeholder={placeHolder}
          value={formValue}
          onChange={(e) => updateForm(e)}
          disableUnderline
          autoFocus
        />
      </form>
      <div className={classes.buttonGroup}>
        <Button
          variant="contained"
          color="primary"
          type="submit"
          onClick={(e) => handleSubmit(e)}
        >
          Add
        </Button>
        <span className={classes.cancel} onClick={toggleShowForm}>
          Cancel
        </span>
      </div>
    </>
  );
}

export default CreateForm;
