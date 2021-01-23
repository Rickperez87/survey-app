import React from "react";
import { withStyles } from "@material-ui/styles";
import Typography from "@material-ui/core/Typography";
import DrawerCircle from "./drawerCircle";

const styles = {
  container: {
    width: "100%",
    background: "#fafafa",
    padding: ".5rem 1rem",
    display: "flex",
    alignContent: "center",
    justifyContent: "space-between",
  },
  name: {
    background: "#e8c547",
    padding: ".5rem",
  },
  text: { padding: ".5rem" },
  bodyText: { fontSize: ".88rem" },
  dot: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
  },
};

const DrawerCard = ({ classes, name, text }) => {
  return (
    <div
      justify="center"
      alignItems="center"
      alignContent="center"
      className={classes.container}
      container
    >
      <div className={classes.dot}>
        <DrawerCircle circleColor="#0984e3" stle={{ marginRight: "1rem" }} />
        <div ClassName={classes.bodyText}>{text}</div>
      </div>
      <Typography variant="caption">{name}</Typography>
    </div>
  );
};

export default withStyles(styles)(DrawerCard);
