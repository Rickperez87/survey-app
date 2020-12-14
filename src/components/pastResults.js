import React from "react";

function PastResults({ data }) {
  return (
    <div>
      <ul>
        {data.map((data) => {
          return (
            <div key={data.surveyId}>
              <h3>{`${data.surveyQuestion.surveyTitle} :: ${data.surveyId}`}</h3>
              {data.surveyResults.map((survey, idx) => {
                return (
                  <li key={idx}> {`${survey.userName} : ${survey.ans}`} </li>
                );
              })}
            </div>
          );
        })}
      </ul>
    </div>
  );
}

export default PastResults;
