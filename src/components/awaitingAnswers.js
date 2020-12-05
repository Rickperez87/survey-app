import React from "react";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";

const styles = {
  root: { margin: ".5rem, auto" },
  buttonGroup: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
};

function AwaitingAnswers({ classes, handleCloseSurvey, handleCancelSurvey }) {
  return (
    <div className={classes.root}>
      <h1>Awaiting Answers...</h1>
      <div className={classes.buttonGroup}>
        <Button
          variant="contained"
          classNames={classes.button}
          color="primary"
          onClick={handleCloseSurvey}
        >
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
    </div>
  );
}

export default withStyles(styles)(AwaitingAnswers);
