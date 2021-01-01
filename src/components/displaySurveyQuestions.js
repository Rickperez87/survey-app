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
    margin: "5rem auto",
    padding: "3rem",
  },
};
function DisplaySurveyQuestions({
  formData,
  handleSubmitAnswer,
  userName,
  classes,
}) {
  const [radio, updateRadio, clearRadio] = useFormState("");

  const title = formData.surveyQuestion.surveyTitle;
  const questionsArray = formData.createQuestion;
  const handleSubmit = function () {
    let responseData = { userName, response: radio };
    socket.emit("submitAnswer", responseData);
    handleSubmitAnswer();
    clearRadio();
  };

  return (
    <Card className={classes.root}>
      <FormControl component="fieldset">
        <FormLabel component="legend">{title}</FormLabel>
        <RadioGroup
          aria-label="Answers"
          name="Answers"
          value={radio}
          onChange={updateRadio}
        >
          {questionsArray.map(function (arr) {
            if (!arr.isFreeResponse) {
              return (
                <FormControlLabel
                  key={arr.id}
                  value={arr.question}
                  control={<Radio />}
                  label={arr.question}
                />
              );
            }
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
