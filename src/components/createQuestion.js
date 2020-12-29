import React, { useEffect } from "react";
import socket from "../server/socketConfig";
import Input from "@material-ui/core/Input";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CreateQuestionForm from "./CreateQuestionForm";
import { withStyles } from "@material-ui/core/styles";

const styles = {
  root: {
    maxWidth: "500px",
    display: "flex",
    flexDirection: "column",
    margin: "5rem auto",
    padding: "3rem",

    "& Input": {
      padding: "1rem 0",
    },
  },
  submitButton: {
    marginTop: "1rem",
  },
};
let surveyTyp = "multiChoice";
const CreateQuestion = function ({
  toggleAwaitingAnswers,
  classes,
  setData,
  data,
  uId,
}) {
  useEffect(() => {
    setData((data) => ({
      ...data,
      surveyId: `aa${uId()}bb`,
    }));
  }, []);

  const getSurveyType = (e) => {
    surveyTyp = e.target.checked ? "freeResponse" : "multiChoice";
    console.log(e.target.checked, surveyTyp);
  };
  const updateForm = (e) => {
    setData({
      ...data,
      surveyQuestion: {
        ...data.surveyQuestion,
        [e.target.name]: e.target.value,
      },
    });
  };

  const handleSubmit = function (e) {
    e.preventDefault();
    socket.emit("sentQuestion", { data, surveyTyp });
    toggleAwaitingAnswers();
  };

  const { surveyTitle, q1, q2, q3, q4 } = data;
  return (
    <Card id="createQuestion" className={classes.root}>
      <div>
        <input
          type="checkbox"
          onClick={(e) => getSurveyType(e)}
          id="freeResponse"
          name="freeResponse"
        />
        <label for="freeResponse">Free Response</label>
      </div>

      <Input
        placeholder="Survey Question"
        inputProps={{ "aria-label": "Survey Title" }}
        name="surveyTitle"
        value={surveyTitle}
        onChange={updateForm}
      />
      <Input
        name="q1"
        placeholder="Multi-Choice Answer-1"
        inputProps={{ "aria-label": "Add Multi-Choice Answer1" }}
        value={q1}
        onChange={updateForm}
      />
      <Input
        name="q2"
        inputProps={{ "aria-label": "Add Multi-Choice Answer2" }}
        placeholder="Multi-Choice Answer-2"
        value={q2}
        onChange={updateForm}
      />
      <Input
        name="q3"
        inputProps={{ "aria-label": "Add Multi-Choice Answer3" }}
        placeholder="Multi-Choice Answer-3"
        value={q3}
        onChange={updateForm}
      />
      <Input
        name="q4"
        inputProps={{ "aria-label": "Add Multi-Choice Answer4" }}
        placeholder="Multi-Choice Answer-4"
        value={q4}
        onChange={updateForm}
      />
      <Button
        className={classes.submitButton}
        inputProps={{ "aria-label": "Submit Survey Form Button" }}
        variant="contained"
        color="primary"
        onClick={handleSubmit}
      >
        Submit
      </Button>
      <CreateQuestionForm />
    </Card>
  );
};

export default withStyles(styles)(CreateQuestion);
