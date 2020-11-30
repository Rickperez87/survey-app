import React from "react";
import Button from "@material-ui/core/Button";

function AwaitingAnswers({ handleCloseSurvey }) {
  return (
    <div>
      <h1>Awaiting Answers...</h1>
      <Button variant="contained" color="secondary" onClick={handleCloseSurvey}>
        Close Survey
      </Button>
    </div>
  );
}

export default AwaitingAnswers;
