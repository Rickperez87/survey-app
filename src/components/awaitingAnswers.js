import React from "react";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";

const styles = {
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonGroup: {
    minWidth: "500px",
    display: "flex",
    margin: ".5rem",
    alignItems: "center",
    justifyContent: "spaceAround",
  },
  button: {
    marginRight: "1rem",
  },
};

function AwaitingAnswers({ classes, handleCloseSurvey, handleCancelSurvey }) {
  return (
    <div className={classes.root}>
      <h1>Awaiting Answers...</h1>
      <div className={classes.buttonGroup}>
        <Button
          variant="contained"
          className={classes.button}
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
