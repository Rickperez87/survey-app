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
    fontSize: "1.3rem",
  },
  cancel: {
    cursor: "pointer",
    padding: ".4rem .8rem",
    "&:hover": {
      textDecoration: "underline",
    },
  },
  buttonGroup: {
    display: "flex",
    alignItem: "center",
    justifyContent: "flex-start",
    margin: "1.6rem 0 .8rem",
  },
}));

function CreateTitleForm({
  surveyTitle,
  updateForm,
  toggleIsActive,
  toggleShowForm,
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
          name="surveyTitle"
          placeholder="e.g. What's your Favorite Ice Cream Flavor?"
          inputProps={{ "aria-label": "Survey Question" }}
          value={surveyTitle}
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

export default CreateTitleForm;
