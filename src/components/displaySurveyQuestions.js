import React from "react";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import Button from "@material-ui/core/Button";

export default function DisplaySurveyQuestions(props) {
  const submitAnswer = () => {
    console.log(`submitted ${props.radio}`);
    props.socket.emit("submitAnswer", props.radio);
    props.clearRadio();
  };

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
        onClick={() => submitAnswer()}
      >
        Submit
      </Button>
    </div>
  );
}
//add submit button and it will emit to server which will send to surveyor and then can display to all brodcast showing breakdown.
