import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Survey from "../Survey";
// import LandingPage from "../LandingPage";
import "./app.css";

const app = () => {
  return (
    <Router>
      <Switch>
        {/* Landing page is work in progress. not deploying yet */}
        {/* <Route exact path="/">
          <LandingPage /> */}
        {/* </Route> */}
        <Route exact path="/">
          <Survey />
        </Route>
      </Switch>
    </Router>
  );
};
export default app;
