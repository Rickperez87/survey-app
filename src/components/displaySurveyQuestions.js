import React from "react";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import Button from "@material-ui/core/Button";

export default function DisplaySurveyQuestions(props) {
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
      <Button
        variant="contained"
        color="primary"
        onClick={() => props.handleSubmitAnswer()}
      >
        Submit
      </Button>
    </div>
  );
}
//server put receive answers and put in an array and display to admin who then can brodcast to all others.
