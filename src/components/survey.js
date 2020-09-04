import React, { Component } from "react";
import "../styles/survey.css";

class Survey extends Component {
  render() {
    return (
      <div id="createQuestion">
        <h1>create a question:</h1>
        <input id="question" type="text"></input>
        <input id="option1" type="text"></input>
        <input id="option2" type="text"></input>
        <input id="option3" type="text"></input>
        <input id="option4" type="text"></input>
      </div>
    );
  }
}

export default Survey;
