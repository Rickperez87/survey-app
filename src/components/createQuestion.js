import React from "react";
import Input from "@material-ui/core/Input";
import Button from "@material-ui/core/Button";
function CreateQuestion(props) {
  return (
    <div
      id="createQuestion"
      className={props.loggedin ? "createQuestion" : "hidden"}
    >
      <Input
        placeholder="Survey Question"
        inputProps={{ "aria-label": "description" }}
        value={props.message}
        onChange={props.updateMessage}
      />
      <Input
        placeholder="Answer-1"
        inputProps={{ "aria-label": "description" }}
        value={props.answer1}
        onChange={props.updateAnswer1}
      />
      <Input
        inputProps={{ "aria-label": "description" }}
        placeholder="Answer-2"
        value={props.answer2}
        onChange={props.updateAnswer2}
      />
      <Input
        inputProps={{ "aria-label": "description" }}
        placeholder="Answer-3"
        value={props.answer3}
        onChange={props.updateAnswer3}
      />
      <Input
        inputProps={{ "aria-label": "description" }}
        placeholder="Answer-4"
        value={props.answer4}
        onChange={props.updateAnswer4}
      />
      <Button
        variant="contained"
        color="primary"
        onClick={() => props.handleSubmit()}
      >
        Submit
      </Button>
    </div>
  );
}

export default CreateQuestion;
