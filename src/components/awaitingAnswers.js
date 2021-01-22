import React from "react";
import Button from "@material-ui/core/Button";
import StyledButton from "../Styled/Button";
import { withStyles } from "@material-ui/core/styles";

const styles = {
  root: {
    background: "#fff",
    maxWidth: "45.5rem",
    display: "flex",
    flexDirection: "column",
    margin: "4rem auto 0 auto",
    alignItems: "center",
    justifyContent: "center",
    boxShadow: "0px 1px 2px 0px rgba(0,0,0,0.33)",
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
  header: {
    padding: "6rem 6rem 2rem 6rem",
    // border: "1px solid black",
  },
  main: {
    padding: "0 6rem 6rem 6rem",
    // display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "flex-start",
  },
};

function AwaitingAnswers({ classes, handleCloseSurvey, handleCancelSurvey }) {
  return (
    <div className={classes.root}>
      <header className={classes.header}>
        <h1>Awaiting Answers...</h1>
        <div className={classes.buttonGroup}>
          <StyledButton
            colorType="primary"
            handleClick={handleCloseSurvey}
            label="Show Results"
          />

          <Button variant="contained" onClick={handleCancelSurvey}>
            Cancel Results
          </Button>
        </div>
      </header>
    </div>
  );
}

export default withStyles(styles)(AwaitingAnswers);
