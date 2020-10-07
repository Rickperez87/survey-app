import React from "react";

function SurveyResults(props) {
  return (
    props.surveyResults && (
      <div className="container">
        <h1>Survey Results</h1>
        <div className="surveyResults-container">{props.surveyResults}</div>
      </div>
    )
  );
}

export default SurveyResults;
