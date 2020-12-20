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
import Input from "@material-ui/core/Input";

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
function DisplayFRQuestions({
  formData,
  handleSubmitAnswer,
  userName,
  classes,
}) {
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
      <FormControl component="fieldset">
        <FormLabel component="legend">{title}</FormLabel>
        <Input
          placeholder="Response"
          inputProps={{ "aria-label": "description" }}
          name="Response"
          value={surveyTitle}
          onChange={updateForm}
        />
      </FormControl>
      <Button variant="contained" color="primary" onClick={handleSubmit}>
        Submit
      </Button>
    </Card>
  );
}
export default withStyles(styles)(DisplayFRQuestions);
