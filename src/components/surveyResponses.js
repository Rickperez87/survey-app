import React from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import { withStyles } from "@material-ui/core/styles";
import Divider from "@material-ui/core/Divider";
import GridList from "./GridList";

const styles = {
  root: {
    maxWidth: "45.5rem",
    margin: ".5rem auto",
  },
  title: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "1rem",
  },
  header: {
    background: "#fff",
    padding: "2rem 2rem",
    boxShadow: "0px 1px 2px 0px rgba(0,0,0,0.33)",
  },
  main: {
    paddingTop: ".5rem",
    // display: "flex",
    // flexDirection: "column",
    // justifyContent: "center",
    // alignItems: "flex-start",
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
      <header className={classes.header}>
        <h1 className={classes.title}>{surveyTitle}</h1>
      </header>
      <Divider fullWidth />
      <main className={classes.main}>
        <GridList list={surveyResults} />
        {/* <List className={classes.list}>
          {surveyResults.map((response, idx) => {
            return (
              <ListItem className={classes.listItem} key={idx}>
                {`${response.userName} answered -       ${response.response}`}
              </ListItem>
            );
          })}
        </List> */}
      </main>
    </div>
  );
}

export default withStyles(styles)(SurveyResponses);
