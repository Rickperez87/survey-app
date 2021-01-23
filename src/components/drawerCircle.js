import React from "react";
import { withStyles } from "@material-ui/styles";

const styles = {
  circle: {
    width: "10px",
    height: "10px",
    borderRadius: "50%",
    display: "inline-block",
    marginRight: "1rem",
  },
};
const DrawerCircle = ({ classes, circleColor }) => {
  return (
    <div className={classes.circle} style={{ background: circleColor }}></div>
  );
};

export default withStyles(styles)(DrawerCircle);
