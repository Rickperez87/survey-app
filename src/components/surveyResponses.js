import React from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Card from "@material-ui/core/Card";
import { withStyles } from "@material-ui/core/styles";

const styles = {
  root: {
    width: "500px",
    margin: "1rem auto",
    padding: "2rem",
  },
  list: {},
};

function SurveyResponses({ classes, data }) {
  const { surveyResults } = data;
  console.log(data);
  return (
    <Card className={classes.root}>
      <List className={classes.list}>
        {surveyResults.map((response, idx) => {
          return (
            <ListItem className={classes.listItem} key={idx}>
              {`${response.userName} answered -       ${response.ans}`}
            </ListItem>
          );
        })}
      </List>
    </Card>
  );
}

export default withStyles(styles)(SurveyResponses);
