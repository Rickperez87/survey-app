import React, { useState, useRef, useEffect } from "react";
import useToggle from "../custom-react-hooks/useToggle";
import Navbar from "../components/navbar";
import CreateQuestion from "./createQuestion";
import DisplaySurveyQuestions from "./displaySurveyQuestions";
import SurveyResponses from "./surveyResponses";
import SurveyResults from "./surveyResults";
import socket from "../socketConfig";
import Card from "@material-ui/core/Card";
import AwaitingAnswers from "./awaitingAnswers";

//In the future: refactor to split admin socket from other user sockets. then can refactor the way things are laid out and use fewer toggles
export default function Survey() {
  const [loggedin, toggleLoggedin] = useToggle(false);
  const [awaitingAnswers, toggleAwaitingAnswers] = useToggle(false);
  const [userName, setUserName] = useState(`user ${uniqueId()}`);
  const [questionDisplayed, toggleQuestionDisplayed] = useToggle(false);
  const [ResultsDialogOpen, toggleResultsDialog] = useToggle(false);
  const [surveyResponses, setSurveyResponses] = useState([]);
  const [surveyResults, setSurveyResults] = useState(false);

  let title = useRef("");
  let questions = useRef("");

  useEffect(() => {
    socket.on("connect", function () {
      console.log("Client Connected");
    });

    return () => {
      socket.off("connect");
    };
  }, []);

  useEffect(() => {
    socket.on("confirmLogin", function () {
      toggleLoggedin();
    });

    return () => {
      socket.off("confirmLogin");
    };
  }, []);

  function uniqueId() {
    return Math.floor(Math.random() * 1000);
  }

  useEffect(() => {
    socket.on("surveyQuestion", function (data) {
      questions.current = data;
    });
    return () => {
      socket.off("surveyQuestion");
    };
  }, []);

  socket.on("surveyTitle", function (incomingTitle) {
    title.current = incomingTitle;
    toggleQuestionDisplayed();
    toggleAwaitingAnswers();
    return () => {
      socket.off("surveyTitle");
    };
  });

  const submitAnswer = function () {
    toggleAwaitingAnswers();
    toggleQuestionDisplayed();
  };

  useEffect(() => {
    socket.on("receiveAnswer", function (ans) {
      let result = [...surveyResponses, ans];
      setSurveyResponses(result);
    });
  }, [surveyResponses]);

  const closeSurvey = function () {
    socket.emit("surveyResults", surveyResponses);
    toggleAwaitingAnswers();
    toggleResultsDialog();
  };

  useEffect(() => {
    socket.on("results", function (results) {
      setSurveyResults(results);
      setSurveyResponses([]);
      toggleResultsDialog();
    });
  }, []);

  const handleCloseResults = function () {
    toggleResultsDialog();
  };

  return (
    <div>
      <Navbar userName={userName} setUserName={setUserName} />

      {loggedin && !awaitingAnswers && (
        <CreateQuestion
          className="createQuestionContainer"
          toggleAwaitingAnswers={toggleAwaitingAnswers}
        />
      )}

      {awaitingAnswers && loggedin && (
        <AwaitingAnswers
          className="awaitingAnswers"
          handleCloseSurvey={closeSurvey}
        />
      )}

      <Card>
        {questionDisplayed && !loggedin && (
          <DisplaySurveyQuestions
            title={title.current}
            questions={questions.current}
            handleSubmitAnswer={submitAnswer}
            userName={userName}
          />
        )}
      </Card>

      <SurveyResponses surveyResponses={surveyResponses} />

      <SurveyResults
        onClose={handleCloseResults}
        open={ResultsDialogOpen}
        surveyResults={surveyResults}
      />
    </div>
  );
}
