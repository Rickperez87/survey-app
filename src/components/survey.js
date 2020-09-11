import React, { useState, useEffect } from "react";
import useFormState from "../custom-react-hooks/form-state-hook";
import useToggle from "../custom-react-hooks/useToggle";
import Login from "./login";
import CreateQuestion from "./createQuestion";
import DisplaySurveyQuestions from "./displaySurveyQuestions";
import io from "socket.io-client";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

const socket = io("http://localhost:4000", {
  transports: ["websocket", "polling"],
});

socket.on("connect", () => {
  console.log("rick is here");
});

export default function Survey() {
  const [message, updateMessage, clearMessage] = useFormState("");
  const [answer1, updateAnswer1, clearAnswer1] = useFormState("");
  const [answer2, updateAnswer2, clearAnswer2] = useFormState("");
  const [answer3, updateAnswer3, clearAnswer3] = useFormState("");
  const [answer4, updateAnswer4, clearAnswer4] = useFormState("");
  const [surveyQuestion, setSurveyQuestion] = useState([]);
  const [adminId, setAdminId] = useState("");
  const [surveyAnswers, setSurveyAnswers] = useState([]);
  const [loggedin, toggleLoggedin] = useToggle(false);
  const [questionDisplayed, toggleQuestionDisplayed] = useToggle(false);
  const [radio, updateRadio, clearRadio] = useFormState("");

  useEffect(() => {
    socket.on("chat-message", (surveyQuestion) => {
      console.log(`incoming message: ${surveyQuestion}`);
      setSurveyQuestion(surveyQuestion[0]);
      surveyQuestion.shift();
      setSurveyAnswers([...surveyQuestion]);
      toggleQuestionDisplayed();
      //toggle question will close out the on second time submitting question. What need to do is display results to all and that function toggle display question off. Then on next submit will toggle on.
    });
    socket.on("confirmLogin", (adminId) => {
      console.log("login successful", adminId);
      setAdminId(adminId);
      toggleLoggedin();
    });
    socket.on("receiveAnswer", (ans) =>
      console.log(`good job received ${ans}`)
    );
  });

  const submit = () => {
    let text = [message, answer1, answer2, answer3, answer4];
    socket.emit("text", text);
    clearMessage();
    clearAnswer1();
    clearAnswer2();
    clearAnswer3();
    clearAnswer4();
  };
  return (
    <div>
      <Login
        TextField={TextField}
        socket={socket}
        Button={Button}
        loggedin={loggedin}
        questionDisplayed={questionDisplayed}
        className={loggedin ? "hidden" : ""}
      />
      <CreateQuestion
        answer1={answer1}
        updateAnswer1={updateAnswer1}
        clearAnswer1={clearAnswer1}
        answer2={answer2}
        updateAnswer2={updateAnswer2}
        clearAnswer2={clearAnswer2}
        answer3={answer3}
        updateAnswer3={updateAnswer3}
        clearAnswer3={clearAnswer3}
        answer4={answer4}
        updateAnswer4={updateAnswer4}
        clearAnswer4={clearAnswer4}
        TextField={TextField}
        Button={Button}
        loggedin={loggedin}
        message={message}
        updateMessage={updateMessage}
        handleSubmit={submit}
      />
      {/* extract display question component and set up array to show question and display possible answers as radio buttons */}
      <DisplaySurveyQuestions
        socket={socket}
        loggedin={loggedin}
        questionDisplayed={questionDisplayed}
        surveyQuestion={surveyQuestion}
        surveyAnswers={surveyAnswers}
        radio={radio}
        updateRadio={updateRadio}
        clearRadio={clearRadio}
        adminId={adminId}
      />
    </div>
  );
}
