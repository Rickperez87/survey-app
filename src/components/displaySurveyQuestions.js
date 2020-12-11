import React from "react";
import socket from "../server/socketConfig";
import useFormState from "../custom-react-hooks/form-state-hook";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import { withStyles } from "@material-ui/core/styles";

const styles = {
  root: {
    maxWidth: "500px",
    display: "flex",
    flexDirection: "column",
    margin: "0 auto",
    padding: "3rem",
  },
};
function DisplaySurveyQuestions({
  formData,
  handleSubmitAnswer,
  userName,
  classes,
}) {
  //fix this -> Pattern for passing radio through function to parent
  const [radio, updateRadio, clearRadio] = useFormState("");

  const questionValues = Object.values(formData);
  const title = questionValues.shift();
  const handleSubmit = function () {
    let responseData = { userName, ans: radio };
    socket.emit("submitAnswer", responseData);
    handleSubmitAnswer();
    clearRadio();
  };

  return (
    <Card className={classes.root}>
      {/* refactor this to use radio and update radio in this component and extract through a passed down func */}
      <FormControl component="fieldset">
        <FormLabel component="legend">{title}</FormLabel>
        <RadioGroup
          aria-label="Answers"
          name="Answers"
          value={radio}
          onChange={updateRadio}
        >
          {questionValues.map(function (q, index) {
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
    </Card>
  );
}
export default withStyles(styles)(DisplaySurveyQuestions);
