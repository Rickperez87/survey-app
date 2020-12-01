import React from "react";
import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";

function SurveyResults({ surveyResults, open, onClose }) {
  return (
    surveyResults && (
      <Dialog className="container" open={open} onClose={onClose}>
        <DialogTitle>Survey Results</DialogTitle>
        <List className="surveyResults-container">
          {surveyResults.map((result, idx) => {
            return <ListItem key={idx}>{result}</ListItem>;
          })}
        </List>
      </Dialog>
    )
  );
}

export default SurveyResults;
