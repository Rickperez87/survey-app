import React, { useState } from "react";
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
  setPastResults,
  pastResults,
}) {
  const [form, changeForm] = useState({
    surveyTitle: "",
    answer1: "",
    answer2: "",
    answer3: "",
    answer4: "",
  });

  const updateForm = (e) => {
    changeForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = function (e) {
    e.preventDefault();
    let title = form.surveyTitle;
    let text = [form.answer1, form.answer2, form.answer3, form.answer4];
    changeForm({
      surveyTitle: "",
      answer1: "",
      answer2: "",
      answer3: "",
      answer4: "",
    });
    setPastResults((pastResults) => [...pastResults, { title }]);
    socket.emit("sentQuestion", text);
    socket.emit("sentTitle", title);
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
        name="answer1"
        placeholder="Answer-1"
        inputProps={{ "aria-label": "description" }}
        value={form.answer1}
        onChange={updateForm}
      />
      <Input
        name="answer2"
        inputProps={{ "aria-label": "description" }}
        placeholder="Answer-2"
        value={form.answer2}
        onChange={updateForm}
      />
      <Input
        name="answer3"
        inputProps={{ "aria-label": "description" }}
        placeholder="Answer-3"
        value={form.answer3}
        onChange={updateForm}
      />
      <Input
        name="answer4"
        inputProps={{ "aria-label": "description" }}
        placeholder="Answer-4"
        value={form.answer4}
        onChange={updateForm}
      />
      <Button variant="contained" color="primary" onClick={handleSubmit}>
        Submit
      </Button>
    </Card>
  );
};

export default withStyles(styles)(CreateQuestion);
