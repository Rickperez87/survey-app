import React from "react";

function SurveyResponses(props) {
  const { surveyResponses } = props;
  return (
    surveyResponses && (
      <div>
        {surveyResponses.map((ans, idx) => {
          return (
            <div className="response" key={idx}>
              {ans}
            </div>
          );
        })}
      </div>
    )
  );
}

export default SurveyResponses;
