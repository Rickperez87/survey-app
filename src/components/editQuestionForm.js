import React from "react";
import TextField from "@material-ui/core/TextField";
import useFormState from "../custom-react-hooks/form-state-hook";

function EditQuestionForm({ id, question, editQuestion, toggleEdit }) {
  const [val, handleChange, clear] = useFormState(question);
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        editQuestion(id, val);
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
    </form>
  );
}

export default EditQuestionForm;
