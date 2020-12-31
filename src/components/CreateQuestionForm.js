import React from "react";
import useFormState from "../custom-react-hooks/form-state-hook";
import useToggle from "../custom-react-hooks/useToggle";
import { makeStyles } from "@material-ui/core/styles";
import InputBase from "@material-ui/core/InputBase";
import IconButton from "@material-ui/core/IconButton";
import AddIcon from "@material-ui/icons/Add";
import Checkbox from "@material-ui/core/Checkbox";
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
  const classes = useStyles();
  const [val, setVal, clear] = useFormState("");
  const [isFreeResponse, toggle] = useToggle(false);

  const clearToggle = () => {
    if (isFreeResponse) toggle();
  };
  const uncheck = (i) => {
    let ref = "check";
    refs[ref].checked = !refs[ref].checked;
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    addQuestion(val, isFreeResponse);
    clear();
    clearToggle();
    unCheck(i);
  };

  return (
    // <Paper>
    <form
      className={classes.form}
      onSubmit={(e) => {
        handleSubmit(e);
      }}
    >
      <Checkbox onChange={toggle} ref={"check"}>
        Free Response{" "}
      </Checkbox>
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