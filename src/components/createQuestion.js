import React, { useState, useEffect } from "react";
import socket from "../server/socketConfig";
import Input from "@material-ui/core/Input";
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

    "& Input": {
      padding: "1rem 0",
    },
  },
};
let surveyTyp;
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
    console.log(surveyTyp);
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
        inputProps={{ "aria-label": "description" }}
        name="surveyTitle"
        value={surveyTitle}
        onChange={updateForm}
      />
      <Input
        name="q1"
        placeholder="Answer-1"
        inputProps={{ "aria-label": "description" }}
        value={q1}
        onChange={updateForm}
      />
      <Input
        name="q2"
        inputProps={{ "aria-label": "description" }}
        placeholder="Answer-2"
        value={q2}
        onChange={updateForm}
      />
      <Input
        name="q3"
        inputProps={{ "aria-label": "description" }}
        placeholder="Answer-3"
        value={q3}
        onChange={updateForm}
      />
      <Input
        name="q4"
        inputProps={{ "aria-label": "description" }}
        placeholder="Answer-4"
        value={q4}
        onChange={updateForm}
      />
      <Button variant="contained" color="primary" onClick={handleSubmit}>
        Submit
      </Button>
    </Card>
  );
};

export default withStyles(styles)(CreateQuestion);
