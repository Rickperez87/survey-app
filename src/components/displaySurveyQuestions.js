import React from "react";

function DisplaySurveyQuestions(props) {
  return (
    <div>
      <ul
        className={
          props.loggedin || !props.questionDisplayed
            ? "hidden"
            : "displayQuestion"
        }
      >
        <h1>Survey Question:</h1>
        {props.displaySurveyQuestion.map((surveyQuestion) => (
          <props.List>
            <props.Checkbox edge="start" tabIndex={-1} disableRipple />
            {surveyQuestion}
          </props.List>
        ))}
      </ul>
    </div>
  );
}

export default DisplaySurveyQuestions;
