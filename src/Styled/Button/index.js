import React from "react";
import clsx from "clsx";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";

const styles = {
  root: {
    color: "white",
    fontSize: ".8rem",
    padding: ".5rem 1.5rem",
  },
  primary: {
    background: "#3f51b5",
  },
  secondary: {
    backgroundColor: "#f50057",
  },
  wide: {
    width: "98%",
  },
};

const StyledButton = ({
  classes,
  handleClick,
  label,
  size,
  type,
  colorType,
}) => {
  return (
    <Button
      type={type}
      variant="contained"
      className={clsx(classes.root, classes[size])}
      color={colorType}
      onClick={handleClick}
    >
      {label}
    </Button>
  );
};
export default withStyles(styles)(StyledButton);
