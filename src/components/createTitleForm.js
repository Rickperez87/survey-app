import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Input from "@material-ui/core/Input";
import Button from "@material-ui/core/Button";
import StyledButton from "../Styled/Button";

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
    padding: ".5rem 1rem",
    "&:hover": {
      textDecoration: "underline",
    },
  },
  buttonGroup: {
    display: "flex",
    alignItem: "center",
    justifyContent: "flex-start",
    margin: "1rem 0",
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
        <StyledButton
          colorType="primary"
          type="submit"
          label="Add Question"
          handleClick={(e) => handleSubmit(e)}
        />
        <span className={classes.cancel} onClick={toggleShowForm}>
          Cancel
        </span>
      </div>
    </>
  );
}

export default CreateTitleForm;
