import React from "react";
import Container from "@material-ui/core/Container";
import Card from "@material-ui/core/Card";
import AccessTimeIcon from "@material-ui/icons/AccessTime";
import CardContent from "@material-ui/core/CardContent";

import { withStyles } from "@material-ui/styles";

const styles = {
  container: {
    background: "#fff",
    boxShadow: "0px 1px 2px 0px rgba(0,0,0,0.33)",
  },
  card: {
    padding: "3.2rem",
  },
  header: {
    "& span": {
      textAlign: "center",
    },
  },
};

const AwaitingSurvey = (classes) => {
  return (
    <Container className={classes.container}>
      <Card className={classes.card}>
        <div
          className={classes.header}
          style={{
            textAlign: "center",
            fontSize: "2rem",
            fontWeight: "500",
          }}
        >
          Survey Will begin Shortly
        </div>
        <CardContent>
          <div
            className={classes.timeIcon}
            style={{
              height: "5rem",
              marginBottom: "1.6rem",
            }}
          >
            <AccessTimeIcon
              style={{ width: "100%", height: "100%", textAlign: "center" }}
            />
          </div>
          The survey has not started yet. Once activated, this area will display
          a question
        </CardContent>
      </Card>
    </Container>
  );
};
export default withStyles(styles)(AwaitingSurvey);
