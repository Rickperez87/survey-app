import React, { useState, useEffect } from "react";
import useFormState from "../custom-react-hooks/form-state-hook";
import useToggle from "../custom-react-hooks/useToggle";
import Navbar from "../components/navbar";
import Login from "./login";
import CreateQuestion from "./createQuestion";
import DisplaySurveyQuestions from "./displaySurveyQuestions";
import SurveyResponses from "./surveyResponses";
import SurveyResults from "./surveyResults";
import io from "socket.io-client";
import Card from "@material-ui/core/Card";
import Button from "@material-ui/core/Button";

const socket = io("http://localhost:4000", {
  transports: ["websocket", "polling"],
});

socket.on("connect", () => {
  console.log("Client Connected");
});

export default function Survey() {
  const [awaitingAnswers, toggleAwaitingAnswers] = useToggle(false);
  const [message, updateMessage, clearMessage] = useFormState("");
  const [answer1, updateAnswer1, clearAnswer1] = useFormState("");
  const [answer2, updateAnswer2, clearAnswer2] = useFormState("");
  const [answer3, updateAnswer3, clearAnswer3] = useFormState("");
  const [answer4, updateAnswer4, clearAnswer4] = useFormState("");
  const [surveyQuestion, setSurveyQuestion] = useState([]);
  const [surveyResponses, setSurveyResponses] = useState([]);
  const [surveyResults, setSurveyResults] = useState(false);
  const [adminId, setAdminId] = useState("");
  const [surveyAnswers, setSurveyAnswers] = useState([]);
  const [loggedin, toggleLoggedin] = useToggle(false);
  const [loginLink, toggleLoginLink] = useToggle(false);
  const [questionDisplayed, toggleQuestionDisplayed] = useToggle(false);
  const [radio, updateRadio, clearRadio] = useFormState("");

  socket.on("surveyQuestion", (surveyQuestion) => {
    console.log(`incoming message: ${surveyQuestion}`);
    setSurveyQuestion(surveyQuestion[0]);
    surveyQuestion.shift();
    setSurveyAnswers([...surveyQuestion]);
    setSurveyResults(false);
    toggleQuestionDisplayed();
    toggleAwaitingAnswers();
    //this is broadcasting on survey question creation. set this to toggleawaitinganswers also.
    //toggle question will close out the on second time submitting question. What need to do is display results to all and that function toggle display question off. Then on next submit will toggle on.
  });

  socket.on("confirmLogin", (adminId) => {
    console.log("login successful", adminId);
    setAdminId(adminId);
    toggleLoggedin();
  });

  const submitAnswer = () => {
    console.log(`submitted ${radio}`);
    socket.emit("submitAnswer", radio);
    toggleAwaitingAnswers();
    clearRadio();
    setSurveyAnswers([]);
  };

  socket.on("receiveAnswer", (ans) => {
    let result = [...surveyResponses, ans];
    setSurveyResponses(result);
    setSurveyAnswers([]);
  });
  socket.on("results", (results) => {
    setSurveyResults(results);
    setSurveyAnswers([]);
    setSurveyQuestion([]);
    setSurveyResponses([]);
    //transmits to all exept sender
  });

  const submit = () => {
    setSurveyResults(false);
    let text = [message, answer1, answer2, answer3, answer4];
    socket.emit("sentQuestion", text);
    clearMessage();
    clearAnswer1();
    clearAnswer2();
    clearAnswer3();
    clearAnswer4();
    toggleAwaitingAnswers();
  };

  const closeSurvey = () => {
    socket.emit("surveyResults", surveyResponses);
    toggleAwaitingAnswers();
    setSurveyQuestion([]);
  };

  return (
    <div>
      <Navbar toggleLoginLink={toggleLoginLink} />

      {loginLink && (
        <Login
          socket={socket}
          loggedin={loggedin}
          questionDisplayed={questionDisplayed}
          className={loggedin ? "hidden" : ""}
        />
      )}
      <div className={awaitingAnswers ? "hidden" : "createQuestionContainer"}>
        <CreateQuestion
          answer1={answer1}
          updateAnswer1={updateAnswer1}
          answer2={answer2}
          updateAnswer2={updateAnswer2}
          answer3={answer3}
          updateAnswer3={updateAnswer3}
          clearAnswer3={clearAnswer3}
          answer4={answer4}
          updateAnswer4={updateAnswer4}
          loggedin={loggedin}
          message={message}
          updateMessage={updateMessage}
          handleSubmit={submit}
        />
      </div>
      <div
        className={awaitingAnswers && loggedin ? "awaitingAnswers" : "hidden"}
      >
        <h1>Awaiting Answers...</h1>
        <Button
          variant="contained"
          color="secondary"
          onClick={() => closeSurvey()}
        >
          Close Survey
        </Button>
      </div>
      <Card>
        {questionDisplayed && (
          <DisplaySurveyQuestions
            socket={socket}
            loggedin={loggedin}
            questionDisplayed={questionDisplayed}
            toggleQuestionDisplayed={toggleQuestionDisplayed}
            toggleAwaitingAnswers={toggleAwaitingAnswers}
            surveyQuestion={surveyQuestion}
            surveyAnswers={surveyAnswers}
            radio={radio}
            updateRadio={updateRadio}
            clearRadio={clearRadio}
            adminId={adminId}
            handleSubmitAnswer={submitAnswer}
          />
        )}
      </Card>

      <div className="surveyResponse">
        <SurveyResponses surveyResponses={surveyResponses} />
      </div>

      <SurveyResults surveyResults={surveyResults} />
      {/* need to transmit survey responses on close survey to all. Then reset logic so we can ask the next question. */}
      {/* make this into a dialog box? */}
    </div>
  );
}
