import React from "react";
//props logged in, message, update message, Button
function CreateQuestion(props) {
  return (
    <div
      id="createQuestion"
      className={props.loggedin ? "createQuestion" : "hidden"}
    >
      <props.TextField
        variant="outlined"
        label="Create A Question"
        id="outlined-basic"
        value={props.message}
        onChange={props.updateMessage}
      ></props.TextField>
      <props.TextField
        variant="outlined"
        label="Answer-1"
        id="outlined-basic"
        value={props.answer1}
        onChange={props.updateAnswer1}
      ></props.TextField>
      <props.TextField
        variant="outlined"
        label="Answer-2"
        id="outlined-basic"
        value={props.answer2}
        onChange={props.updateAnswer2}
      ></props.TextField>
      <props.TextField
        variant="outlined"
        label="Answer-3"
        id="outlined-basic"
        value={props.answer3}
        onChange={props.updateAnswer3}
      ></props.TextField>
      <props.TextField
        variant="outlined"
        label="Answer-4"
        id="outlined-basic"
        value={props.answer4}
        onChange={props.updateAnswer4}
      ></props.TextField>
      <props.Button
        variant="contained"
        color="primary"
        onClick={() => {
          props.handleSubmit();
        }}
      >
        Submit
      </props.Button>
    </div>
  );
}

export default CreateQuestion;
