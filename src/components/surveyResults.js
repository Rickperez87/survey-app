import React from "react";
import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";

function SurveyResults({ surveyResults, surveyTitle, open, onClose }) {
  return (
    surveyResults && (
      <Dialog className="container" open={open} onClose={onClose}>
        <DialogTitle>Survey Results</DialogTitle>
        <h3>{surveyTitle}</h3>
        <List className="surveyResults-container">
          {surveyResults.map((result, idx) => {
            return (
              <ListItem
                key={idx}
              >{`${result.userName} answered - ${result.ans}`}</ListItem>
            );
          })}
        </List>
      </Dialog>
    )
  );
}

export default SurveyResults;
