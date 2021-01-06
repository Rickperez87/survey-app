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

function ShowForm({ classes, toggleShowForm, renderText }) {
  const plusIcon = (
    <svg
      className={classes.plusIcon}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 13 13"
      width="13"
      height="13"
      overflow="visible"
      stroke="black"
      strokeWidth="1"
    >
      <line x1="7" y1="0" x2="7" y2="13" />
      <line x1="0" y1="7" x2="13" y2="7" />
    </svg>
  );

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
        {renderText}
      </ListItem>
    </List>
  );
}
export default withStyles(styles)(ShowForm);
