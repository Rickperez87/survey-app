import React from "react";
import socket from "../socketConfig";
import useFormState from "../custom-react-hooks/form-state-hook";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import Button from "@material-ui/core/Button";

export default function DisplaySurveyQuestions({
  title,
  questions,
  handleSubmitAnswer,
}) {
  //fix this -> Pattern for passing radio through function to parent
  const [radio, updateRadio, clearRadio] = useFormState("");

  const handleSubmit = function () {
    socket.emit("submitAnswer", radio);
    handleSubmitAnswer();
    clearRadio();
  };

  return (
    <div>
      {/* refactor this to use radio and update radio in this component and extract through a passed down func */}
      <FormControl component="fieldset">
        <FormLabel component="legend">{title}</FormLabel>
        <RadioGroup
          aria-label="Answers"
          name="Answers"
          value={radio}
          onChange={updateRadio}
        >
          {questions.map(function (q, index) {
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
