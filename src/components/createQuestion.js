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
    margin: "0 auto",
    padding: "3rem",

    "& Input": {
      padding: "1rem 0",
    },
  },
};

const CreateQuestion = function ({
  toggleAwaitingAnswers,
  classes,
  setData,
  data,
  uId,
}) {
  const [form, changeForm] = useState({
    surveyTitle: "",
    q1: "",
    q2: "",
    q3: "",
    q4: "",
  });

  useEffect(() => {
    setData((data) => ({
      ...data,
      surveyId: `aa${uId()}bb`,
    }));
  }, []);

  const updateForm = (e) => {
    changeForm({ ...form, [e.target.name]: e.target.value });
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

    changeForm({
      surveyTitle: "",
      q1: "",
      q2: "",
      q3: "",
      q4: "",
    });

    socket.emit("sentQuestion", data);
    toggleAwaitingAnswers();
  };

  return (
    <Card id="createQuestion" className={classes.root}>
      <Input
        placeholder="Survey Question"
        inputProps={{ "aria-label": "description" }}
        name="surveyTitle"
        value={form.surveyTitle}
        onChange={updateForm}
      />
      <Input
        name="q1"
        placeholder="Answer-1"
        inputProps={{ "aria-label": "description" }}
        value={form.q1}
        onChange={updateForm}
      />
      <Input
        name="q2"
        inputProps={{ "aria-label": "description" }}
        placeholder="Answer-2"
        value={form.q2}
        onChange={updateForm}
      />
      <Input
        name="q3"
        inputProps={{ "aria-label": "description" }}
        placeholder="Answer-3"
        value={form.q3}
        onChange={updateForm}
      />
      <Input
        name="q4"
        inputProps={{ "aria-label": "description" }}
        placeholder="Answer-4"
        value={form.q4}
        onChange={updateForm}
      />
      <Button variant="contained" color="primary" onClick={handleSubmit}>
        Submit
      </Button>
    </Card>
  );
};

export default withStyles(styles)(CreateQuestion);
