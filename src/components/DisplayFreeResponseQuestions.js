import React from "react";
import socket from "../server/socketConfig";
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
  data,
  setData,
  handleSubmitAnswer,
  userName,
  classes,
}) {
  const {
    surveyFRQuestion: { response },
    surveyQuestion,
  } = data;
  const questionValues = Object.values(surveyQuestion);
  const title = questionValues.shift();
  const handleSubmit = function () {
    let responseData = { userName, response };
    console.log(response);
    socket.emit("submitAnswer", responseData);
    handleSubmitAnswer();
  };
  const updateForm = (e) => {
    setData({
      ...data,
      surveyFRQuestion: {
        ...data.surveyFRQuestion,
        [e.target.name]: e.target.value,
      },
    });
  };

  return (
    <Card className={classes.root}>
      <FormControl component="fieldset">
        <FormLabel component="legend">{title}</FormLabel>
        <Input
          placeholder="Response"
          inputProps={{ "aria-label": "description" }}
          name="response"
          value={response}
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
