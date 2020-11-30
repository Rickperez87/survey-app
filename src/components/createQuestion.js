import React from "react";
import socket from "../socketConfig";
import useFormState from "../custom-react-hooks/form-state-hook";
import Input from "@material-ui/core/Input";
import Button from "@material-ui/core/Button";

const CreateQuestion = function ({ toggleAwaitingAnswers }) {
  const [surveyTitle, changeTitle, clearTitle] = useFormState("");
  const [answer1, changeAnswer1, clearAnswer1] = useFormState("");
  const [answer2, changeAnswer2, clearAnswer2] = useFormState("");
  const [answer3, changeAnswer3, clearAnswer3] = useFormState("");
  const [answer4, changeAnswer4, clearAnswer4] = useFormState("");

  const handleSubmit = function (e) {
    e.preventDefault();
    let title = surveyTitle;
    let text = [answer1, answer2, answer3, answer4];
    clearTitle();
    clearAnswer1();
    clearAnswer2();
    clearAnswer3();
    clearAnswer4();
    socket.emit("sentQuestion", text);
    socket.emit("sentTitle", title);
    toggleAwaitingAnswers();
  };
  return (
    <div id="createQuestion" className={"createQuestion"}>
      <Input
        placeholder="Survey Question"
        inputProps={{ "aria-label": "description" }}
        value={surveyTitle}
        onChange={changeTitle}
      />
      <Input
        placeholder="Answer-1"
        inputProps={{ "aria-label": "description" }}
        value={answer1}
        onChange={changeAnswer1}
      />
      <Input
        inputProps={{ "aria-label": "description" }}
        placeholder="Answer-2"
        value={answer2}
        onChange={changeAnswer2}
      />
      <Input
        inputProps={{ "aria-label": "description" }}
        placeholder="Answer-3"
        value={answer3}
        onChange={changeAnswer3}
      />
      <Input
        inputProps={{ "aria-label": "description" }}
        placeholder="Answer-4"
        value={answer4}
        onChange={changeAnswer4}
      />
      <Button variant="contained" color="primary" onClick={handleSubmit}>
        Submit
      </Button>
    </div>
  );
};

export default CreateQuestion;
