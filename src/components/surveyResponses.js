import React from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import { withStyles } from "@material-ui/core/styles";

const styles = {
  root: {
    width: "500px",
    margin: "1rem auto",
    padding: "1rem",
  },
  title: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
};

function SurveyResponses({ classes, setData, data }) {
  let {
    surveyResults,
    surveyQuestion: { surveyTitle },
  } = data;
  let results = [];
  for (let i = 0; i < surveyResults.length; i++) {
    for (let j = i + 1; j < surveyResults.length; j++) {
      if (surveyResults[i].userName === surveyResults[j].userName) {
        results.push(surveyResults[j]);
      }
    }
  }
  console.log(results);
  if (results.length >= 1) {
    let updateData = { ...data };
    updateData.surveyResults = results;

    setData(updateData);
  }
  return (
    <div className={classes.root}>
      <h3 className={classes.title}>{surveyTitle}</h3>
      <List className={classes.list}>
        {surveyResults.map((response, idx) => {
          return (
            <ListItem className={classes.listItem} key={idx}>
              {`${response.userName} answered -       ${response.response}`}
            </ListItem>
          );
        })}
      </List>
    </div>
  );
}

export default withStyles(styles)(SurveyResponses);
