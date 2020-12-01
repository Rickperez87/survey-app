import React from "react";
import Button from "@material-ui/core/Button";

function AwaitingAnswers({ handleCloseSurvey, handleCancelSurvey }) {
  return (
    <div>
      <h1>Awaiting Answers...</h1>
      <Button variant="contained" color="primary" onClick={handleCloseSurvey}>
        Show Survey Results
      </Button>
      <Button
        variant="contained"
        color="secondary"
        onClick={handleCancelSurvey}
      >
        Cancel Showing Results
      </Button>
    </div>
  );
}

export default AwaitingAnswers;
