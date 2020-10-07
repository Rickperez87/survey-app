import React from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";

function SurveyResponses(props) {
  return (
    <List>
      {props.surveyResponses.map((ans, idx) => {
        return <ListItem key={idx}>{ans}</ListItem>;
      })}
    </List>
  );
}

export default SurveyResponses;
