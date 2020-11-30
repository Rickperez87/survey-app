import React, { useState, useRef } from "react";
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
//try messing with import {pure} and doing pure functional components export pure(component name)
socket.on("connect", function () {
  console.log("Client Connected");
});

export default function Survey() {
  const [loginLink, toggleLoginLink] = useToggle(false);
  const [loggedin, toggleLoggedin] = useToggle(false);
  const [awaitingAnswers, toggleAwaitingAnswers] = useToggle(false);
  const [questionDisplayed, toggleQuestionDisplayed] = useToggle(false);
  const [surveyResponses, setSurveyResponses] = useState([]);
  const [surveyResults, setSurveyResults] = useState(false);

  let title = useRef("");
  let questions = useRef("");

  socket.on("surveyQuestion", function (data) {
    questions.current = data;
  });

  socket.on("surveyTitle", function (incomingTitle) {
    title.current = incomingTitle;
    toggleQuestionDisplayed();
    toggleAwaitingAnswers();
  });

  socket.on("confirmLogin", function (adminId) {
    toggleLoggedin();
  });

  const submitAnswer = function (radio) {
    socket.emit("submitAnswer", radio);
    toggleAwaitingAnswers();
    toggleQuestionDisplayed();
  };

  socket.on("receiveAnswer", function (ans) {
    let result = [...surveyResponses, ans];
    setSurveyResponses(result);
  });

  const closeSurvey = function () {
    socket.emit("surveyResults", surveyResponses);
    toggleAwaitingAnswers();
  };

  socket.on("results", function (results) {
    setSurveyResults(results);
    setSurveyResponses([]);
    //transmits to all exept sender
  });
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
        {questionDisplayed && !loggedin && (
          <DisplaySurveyQuestions
            title={title.current}
            questions={questions.current}
            handleSubmitAnswer={submitAnswer}
          />
        )}
      </Card>
      {/* //Refactor send survey responses as a ref instead of state? */}
      <div className="surveyResponse">
        <SurveyResponses surveyResponses={surveyResponses} />
      </div>

      <SurveyResults surveyResults={surveyResults} />
      {/* make this into a dialog box? */}
    </div>
  );
}
