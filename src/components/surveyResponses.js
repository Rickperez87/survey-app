import React from "react";

function SurveyResponses({ surveyResponses }) {
  return (
    surveyResponses && (
      <div>
        {surveyResponses.map(function (ans, idx) {
          return (
            <div className="response" key={idx}>
              {`${ans.userName} answered -       ${ans.ans}`}
            </div>
          );
        })}
      </div>
    )
  );
}

export default SurveyResponses;
