import React from "react";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";

export default function DisplaySurveyQuestions(props) {
  console.log(props.surveyQuestion, props.surveyAnswers);
  return (
    <div
      className={
        props.loggedin || !props.questionDisplayed
          ? "hidden"
          : "displayQuestion"
      }
    >
      <FormControl component="fieldset">
        <FormLabel component="legend">{props.surveyQuestion}</FormLabel>
        <RadioGroup
          aria-label="Answers"
          name="Answers"
          value={props.radio}
          onChange={props.updateRadio}
        >
          {props.surveyAnswers.map((answer, index) => (
            <FormControlLabel
              key={index}
              value={answer}
              control={<Radio />}
              label={answer}
            />
          ))}
        </RadioGroup>
      </FormControl>
    </div>
  );
}
//add submit button and it will emit to server which will send to surveyor and then can display to all brodcast showing breakdown.
