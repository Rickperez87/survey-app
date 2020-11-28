import React, { Fragment, useEffect, useRef } from "react";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import Button from "@material-ui/core/Button";

//look into useRef to preserve value instead of using so many use state rerenders
export default function DisplaySurveyQuestions(props) {
  // useEffect(() => {
  //   socket.on("surveyTitle", function (incomingTitle) {
  //     console.log(`incoming message: ${incomingTitle}`);
  //     title.current = incomingTitle;
  //     // toggleQuestionDisplayed();
  //     // toggleAwaitingAnswers();
  //     //this is broadcasting on survey question creation. set this to toggleawaitinganswers also.
  //     //toggle question will close out the on second time submitting question. What need to do is display results to all and that function toggle display question off. Then on next submit will toggle on.
  //   });
  //   socket.on("surveyQuestion", function (data) {
  //     console.log(`incoming message: ${data}`);
  //     questions.current = data;
  //     // toggleQuestionDisplayed();
  //     // toggleAwaitingAnswers();
  //     //this is broadcasting on survey question creation. set this to toggleawaitinganswers also.
  //     //toggle question will close out the on second time submitting question. What need to do is display results to all and that function toggle display question off. Then on next submit will toggle on.
  //   });
  // });

  const handleSubmit = function () {
    props.toggleQuestionDisplayed();
    props.handleSubmitAnswer();
  };
  return (
    <Fragment>
      <div
        className={
          !props.loggedin && props.questionDisplayed
            ? "displayQuestion"
            : "hidden"
        }
      >
        <FormControl component="fieldset">
          <FormLabel component="legend">{props.title}</FormLabel>
          <RadioGroup
            aria-label="Answers"
            name="Answers"
            value={props.radio}
            onChange={props.updateRadio}
          >
            {props.questions.map(function (q, index) {
              return (
                <FormControlLabel
                  key={index}
                  value={q}
                  control={<Radio />}
                  label={q}
                />
              );
            })}
          </RadioGroup>
        </FormControl>
        <Button variant="contained" color="primary" onClick={handleSubmit}>
          Submit
        </Button>
      </div>
      <div
        className={
          props.awaitingAnswers && !props.questionDisplayed ? "" : "hidden"
        }
      >
        <h1>awaiting answers...</h1>
      </div>
    </Fragment>
  );
}
