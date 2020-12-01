import React from "react";

function SurveyResults({ surveyResults }) {
  return (
    surveyResults && (
      //  make a dialog
      <div className="container">
        <h1>Survey Results</h1>
        <div className="surveyResults-container">
          {surveyResults.map((result) => {
            return <div>{result}</div>;
          })}
        </div>
      </div>
    )
  );
}

export default SurveyResults;
