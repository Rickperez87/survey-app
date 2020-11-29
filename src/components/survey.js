import React, { useState, useEffect, useRef } from "react";
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

socket.on("connect", function () {
  console.log("Client Connected");
});

export default function Survey() {
  const [loggedin, toggleLoggedin] = useToggle(false);
  const [awaitingAnswers, toggleAwaitingAnswers] = useToggle(false);
  const [surveyResponses, setSurveyResponses] = useState([]);
  const [surveyResults, setSurveyResults] = useState(false);
  const [loginLink, toggleLoginLink] = useToggle(false);
  const [questionDisplayed, toggleQuestionDisplayed] = useToggle(false);
  const [radio, updateRadio, clearRadio] = useFormState("");

  let title = useRef("");
  let questions = useRef("");

  useEffect(() => {
    socket.on("surveyQuestion", function (data) {
      questions.current = data;
    });
  });
  useEffect(() => {
    socket.on("surveyTitle", function (incomingTitle) {
      title.current = incomingTitle;
      toggleQuestionDisplayed();
      toggleAwaitingAnswers();
    });
  });
  useEffect(() => {
    socket.on("confirmLogin", function (adminId) {
      toggleLoggedin();
    });
  });

  const submitAnswer = function () {
    socket.emit("submitAnswer", radio);
    toggleAwaitingAnswers();
    clearRadio();
  };

  socket.on("receiveAnswer", function (ans) {
    let result = [...surveyResponses, ans];
    setSurveyResponses(result);
  });
  socket.on("results", function (results) {
    setSurveyResults(results);
    setSurveyResponses([]);
    //transmits to all exept sender
  });

  const closeSurvey = function () {
    socket.emit("surveyResults", surveyResponses);
    toggleAwaitingAnswers();
  };
  return (
    <div>
      <Navbar
        handleClick={function () {
          toggleLoginLink();
        }}
      />

      {loginLink && <Login socket={socket} toggleLoginLink={toggleLoginLink} />}
      <div className={awaitingAnswers ? "hidden" : "createQuestionContainer"}>
        <CreateQuestion
          loggedin={loggedin}
          socket={socket}
          toggleAwaitingAnswers={toggleAwaitingAnswers}
        />
      </div>
      <div
        className={awaitingAnswers && loggedin ? "awaitingAnswers" : "hidden"}
      >
        <h1>Awaiting Answers...</h1>
        <Button variant="contained" color="secondary" onClick={closeSurvey}>
          Close Survey
        </Button>
      </div>
      <Card>
        {questionDisplayed && (
          <DisplaySurveyQuestions
            loggedin={loggedin}
            questionDisplayed={questionDisplayed}
            toggleQuestionDisplayed={toggleQuestionDisplayed}
            toggleAwaitingAnswers={toggleAwaitingAnswers}
            title={title.current}
            questions={questions.current}
            radio={radio}
            updateRadio={updateRadio}
            clearRadio={clearRadio}
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
