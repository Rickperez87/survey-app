import React from "react";
import Button from "@material-ui/core/Button";
import StyledButton from "../Styled/Button";
import { withStyles } from "@material-ui/core/styles";

const styles = {
  root: {
    marginTop: "3.2rem",
    background: "#fff",
    // maxWidth: "45.5rem",
    display: "flex",
    flexDirection: "column",
    // margin: "4rem auto 0 auto",
    alignItems: "center",
    justifyContent: "center",
    boxShadow: "0px 1px 2px 0px rgba(0,0,0,0.33)",
  },
  buttonGroup: {},
  button: {
    marginRight: "1.6rem",
  },
  header: {
    padding: "3.2rem 3.2rem 3.2rem 3.2rem",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    "& h1": {
      marginBottom: "1.6rem",
      fontSize: "2.4rem",
    },
  },
  main: {
    padding: "0 6.4rem 3.2rem 6.4rem",
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
          <Button
            variant="contained"
            color="primary"
            onClick={handleCloseSurvey}
          >
            Show
          </Button>

          <Button variant="contained" onClick={handleCancelSurvey}>
            Cancel
          </Button>
        </div>
      </header>
    </div>
  );
}

export default withStyles(styles)(AwaitingAnswers);
