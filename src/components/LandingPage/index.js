import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import AppDemo from "../AppDemo.mp4";
const styles = {
  root: {
    background: "#3E50B6",
    color: "#FAFAFA",
    height: "100vh",
    overflow: "scroll",
    fontWeight: "500",
    fontSize: "2rem",
    fontFamily: "Poppins, sans-serif",
    "@media (max-width:575px)": { fontSize: "1.5rem" },
  },
  contentBlock: {
    position: "relative",
    maxWidth: "1000px",
    margin: "0 auto",
    "@media (max-width:1100px)": { maxWidth: "850px" },
    "@media (max-width:875px)": { maxWidth: "550px" },
    "@media (max-width:575px)": { maxWidth: "350px" },
  },
  blurbContainer: {
    position: "absolute",
    top: "249px",
    left: "0",
    maxWidth: "600px",
  },
  largeFont: {
    letterSpacing: ".025em",
  },
  logo: {
    position: "absolute",
    top: "49px",
    left: "0",
    "@media (max-width:575px)": {},
  },
  button: {
    position: "absolute",
    top: "49px",
    right: "0",
    "@media (max-width:575px)": {},
  },
  link: {
    textDecoration: "none",
    color: "black",
  },
  video: {
    position: "absolute",
    top: "249px",
    right: "50px",
  },
};

const LandingPage = ({ classes }) => {
  return (
    <div className={classes.root}>
      <div className={classes.contentBlock}>
        <div className={classes.logo}>Survey~RP</div>
        <Button variant="contained" className={classes.button}>
          <a className={classes.link} href="/app">
            Continue
          </a>
        </Button>
        <div className={classes.blurbContainer}>
          <h1 className={classes.largeFont}>Real-time online survey creator</h1>
          <br />
          <p>Create online surveys, get responses in real-time and connect.</p>
        </div>
      </div>
      <video
        width="400px"
        autoPlay
        src={AppDemo}
        className={classes.video}
      ></video>
    </div>
  );
};

export default withStyles(styles)(LandingPage);
