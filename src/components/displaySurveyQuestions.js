import React from "react";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import Button from "@material-ui/core/Button";

export default function DisplaySurveyQuestions(props) {
  const handleSubmit = function () {
    props.handleSubmitAnswer();
  };
  return (
    <div>
      {/* refactor this to use radio and update radio in this component and extract through a passed down func */}
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
  );
}
