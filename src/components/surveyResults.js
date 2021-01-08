import React from "react";
import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import { withStyles } from "@material-ui/core/styles";

const styles = {
  root: {
    margin: "1rem auto",
    padding: "2rem",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
  },
};

function SurveyResults({ classes, surveyResults, surveyTitle, open, onClose }) {
  return (
    surveyResults && (
      <Dialog
        style={{ margin: "1rem" }}
        maxWidth={false}
        className={classes.root}
        open={open}
        onClose={onClose}
      >
        <DialogTitle className={classes.title}>Survey Results</DialogTitle>
        <h3>{surveyTitle}</h3>
        <List className="surveyResults-container">
          {surveyResults.map((result, idx) => {
            return (
              <ListItem
                key={idx}
              >{`${result.userName} answered - ${result.response}`}</ListItem>
            );
          })}
        </List>
      </Dialog>
    )
  );
}

export default withStyles(styles)(SurveyResults);
