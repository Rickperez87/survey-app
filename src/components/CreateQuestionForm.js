import React from "react";
import useFormState from "../custom-react-hooks/form-state-hook";
import TextField from "@material-ui/core/TextField";

function CreateQuestionForm(props) {
  const [val, setVal, clear] = useFormState("");

  return (
    <div>
      <TextField
        name="input"
        placeholder="Add New Multi-Choice Response"
        inputProps={{ "aria-label": "Add Multi-Choice Response " }}
        value={val}
        onChange={setVal}
      />
    </div>
  );
}

export default CreateQuestionForm;
