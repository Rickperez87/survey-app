import React from "react";
import useFormState from "../custom-react-hooks/form-state-hook";
import { makeStyles } from "@material-ui/core/styles";
import InputBase from "@material-ui/core/InputBase";
import IconButton from "@material-ui/core/IconButton";
import AddIcon from "@material-ui/icons/Add";
import Paper from "@material-ui/core/Paper";

const useStyles = makeStyles((theme) => ({
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
  form: { width: "100%", display: "flex", justifyContent: "space-between" },
}));

function CreateQuestionForm({ addQuestion }) {
  const [val, setVal, clear] = useFormState("");
  const classes = useStyles();

  const handleSubmit = (e) => {
    e.preventDefault();
    addQuestion(val);
    clear();
  };

  return (
    // <Paper>
    <form
      className={classes.form}
      onSubmit={(e) => {
        handleSubmit(e);
      }}
    >
      <InputBase
        className={classes.input}
        name="input"
        placeholder="Add Multi-Choice Response"
        inputProps={{ "aria-label": "Add Multi-Choice Response " }}
        value={val}
        onChange={setVal}
      />
      <IconButton
        className={classes.iconButton}
        type="submit"
        onClick={(e) => handleSubmit(e)}
      >
        <AddIcon></AddIcon>
      </IconButton>
    </form>
    // </Paper>
  );
}

export default CreateQuestionForm;
