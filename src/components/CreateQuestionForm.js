import React from "react";
import useFormState from "../custom-react-hooks/form-state-hook";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";

function CreateQuestionForm({ addQuestion }) {
  const [val, setVal, clear] = useFormState("");

  return (
    <Paper>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          addQuestion(val);
          clear();
        }}
      >
        <TextField
          name="input"
          placeholder="Add Multi-Choice Response"
          inputProps={{ "aria-label": "Add Multi-Choice Response " }}
          value={val}
          onChange={setVal}
          fullWidth={true}
        />
      </form>
    </Paper>
  );
}

export default CreateQuestionForm;
