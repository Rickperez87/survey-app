import React from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import { withStyles } from "@material-ui/styles";

const styles = {
  surveyResponse: {
    color: "grey",
    cursor: "pointer",
    "&:hover": {
      color: "#3f51b5",
      "&:hover $plusButton": {
        color: "#fff",
        background: "#3f51b5",
      },
      "&:hover $plusIcon": {
        stroke: "#fff",
        fill: "none",
      },
    },
  },
  plusIcon: {
    fill: "none",
    stroke: "#3f51b5",
  },
  plusButton: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "17px",
    width: "17px",
    color: "#3f51b5",
    border: "none",
    verticalAlign: "7px",
    borderRadius: "50%",
    marginRight: "1rem",
  },
};

function ShowResponseOptionsForm({ classes, toggleShowForm, plusIcon }) {
  return (
    <List className={classes.response}>
      <ListItem
        disableGutters
        className={classes.surveyResponse}
        onClick={toggleShowForm}
      >
        <span
          className={classes.plusButton}
          aria-label="Open Create Survey Response Form"
        >
          {plusIcon}
        </span>
        Add Survey Response
      </ListItem>
    </List>
  );
}
export default withStyles(styles)(ShowResponseOptionsForm);
