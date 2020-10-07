import React from "react";

function SurveyResponses(props) {
  return (
    <div>
      {props.surveyResponses.map((ans, idx) => {
        return <div key={idx}>{ans}</div>;
      })}
    </div>
  );
}

export default SurveyResponses;
