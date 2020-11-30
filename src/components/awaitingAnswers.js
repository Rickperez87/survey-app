import React from "react";
import Button from "@material-ui/core/Button";
import socket from "../socketConfig";

function AwaitingAnswers({ toggleAwaitingAnswers, surveyResponses }) {
  const closeSurvey = function () {
    socket.emit("surveyResults", surveyResponses);
    toggleAwaitingAnswers();
  };

  return (
    <div>
      <h1>Awaiting Answers...</h1>
      <Button variant="contained" color="secondary" onClick={closeSurvey}>
        Close Survey
      </Button>
    </div>
  );
}

export default AwaitingAnswers;
