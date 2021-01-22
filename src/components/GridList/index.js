import React from "react";
import { withStyles } from "@material-ui/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";

const styles = {
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: "1rem",
    textAlign: "center",
    color: "black",
  },
  nameText: {
    fontWeight: "500",
  },
  responseText: {
    fontSize: "1.5rem",
  },
};

function GridList({ classes, list }) {
  return (
    <div className={classes.root}>
      <Grid container spacing={2}>
        {list.map((item) => {
          return (
            <Grid item xs={6}>
              <Paper className={classes.paper}>
                <Grid item xs={4}>
                  {" "}
                  <span className={classes.nameText}>{item.userName}</span>
                </Grid>
                <Grid item alignContent="center" xs={12}>
                  <span className={classes.responseText}>{item.response}</span>
                </Grid>
              </Paper>
            </Grid>
          );
        })}
      </Grid>
    </div>
  );
}

export default withStyles(styles)(GridList);
