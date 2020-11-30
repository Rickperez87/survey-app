import React, { useState, useRef } from "react";
import useToggle from "../custom-react-hooks/useToggle";
import Navbar from "../components/navbar";
import Login from "./login";
import CreateQuestion from "./createQuestion";
import DisplaySurveyQuestions from "./displaySurveyQuestions";
import SurveyResponses from "./surveyResponses";
import SurveyResults from "./surveyResults";
import socket from "../socketConfig";
import Card from "@material-ui/core/Card";
import AwaitingAnswers from "./awaitingAnswers";

export default function Survey() {
  const [loginLink, toggleLoginLink] = useToggle(false);
  const [loggedin, toggleLoggedin] = useToggle(false);
  const [awaitingAnswers, toggleAwaitingAnswers] = useToggle(false);
  const [questionDisplayed, toggleQuestionDisplayed] = useToggle(false);
  const [surveyResponses, setSurveyResponses] = useState([]);
  const [surveyResults, setSurveyResults] = useState(false);

  let title = useRef("");
  let questions = useRef("");

  function showLogin() {
    toggleLoginLink();
  }
  socket.on("connect", function () {
    console.log("Client Connected");
  });

  socket.on("confirmLogin", function () {
    toggleLoggedin();
    console.log("confirm login works");
  });

  socket.on("surveyQuestion", function (data) {
    questions.current = data;
  });

  socket.on("surveyTitle", function (incomingTitle) {
    title.current = incomingTitle;
    toggleQuestionDisplayed();
    toggleAwaitingAnswers();
  });

  const submitAnswer = function () {
    toggleAwaitingAnswers();
    toggleQuestionDisplayed();
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
  return (
    <div>
      <Navbar handleLogin={showLogin} />

      {loginLink && <Login toggleLoginLink={toggleLoginLink} />}
      <div className={awaitingAnswers ? "hidden" : "createQuestionContainer"}>
        <CreateQuestion
          loggedin={loggedin}
          toggleAwaitingAnswers={toggleAwaitingAnswers}
        />
      </div>

      {awaitingAnswers && loggedin && (
        <AwaitingAnswers
          className={"awaitingAnswers"}
          toggleAwaitingAnswers={toggleAwaitingAnswers}
          surveyResponses={surveyResponses}
        />
      )}

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
