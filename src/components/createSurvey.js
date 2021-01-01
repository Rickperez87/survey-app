import React, { useEffect } from "react";
import socket from "../server/socketConfig";
import Input from "@material-ui/core/Input";
import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import QuestionItem from "./questionItem";
import Card from "@material-ui/core/Card";
import { v4 as uuid } from "uuid";
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
  list: {
    marginTop: "1rem",
  },
};
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

  //old implementation hide for now
  const updateForm = (e) => {
    setData({
      ...data,
      surveyQuestion: {
        ...data.surveyQuestion,
        [e.target.name]: e.target.value,
      },
    });
  };

  const addQuestion = (question, isFreeResponse) => {
    setData({
      ...data,
      createQuestion: [
        ...data.createQuestion,
        { id: uuid(), question, isFreeResponse },
      ],
    });
  };
  const removeQuestion = (id) => {
    const updatedQuestionList = data.createQuestion.filter(
      (question) => question.id !== id
    );
    setData({
      ...data,
      createQuestion: updatedQuestionList,
    });
  };
  const editQuestion = (questionId, newQuestion) => {
    const updatedQuestionList = data.createQuestion.map((question) =>
      question.id === questionId
        ? { ...question, question: newQuestion }
        : question
    );
    setData({
      ...data,
      createQuestion: updatedQuestionList,
    });
  };

  //old way of just 4 questions hard coded
  // const handleSubmit = function (e) {
  //   e.preventDefault();
  //   socket.emit("sentQuestion", { data, surveyTyp });
  //   toggleAwaitingAnswers();
  // };
  //New Implementation work in progress..
  const handleSubmit = function (e) {
    e.preventDefault();
    socket.emit("sentQuestion", data);
    toggleAwaitingAnswers();
  };

  const { createQuestion, surveyTitle } = data;
  return (
    <Card id="createQuestion" className={classes.root}>
      <div>
        <input type="checkbox" id="freeResponse" name="freeResponse" />
        <label for="freeResponse">Free Response</label>
      </div>

      <Input
        placeholder="Add Your Question"
        inputProps={{ "aria-label": "Survey Question" }}
        name="surveyTitle"
        value={surveyTitle}
        onChange={updateForm}
      />
      <CreateQuestionForm addQuestion={addQuestion} />

      <List className={classes.list}>
        {createQuestion.map((question) => {
          return (
            <>
              <Divider />
              <QuestionItem
                className={classes.listItem}
                question={question.question}
                id={question.id}
                removeQuestion={removeQuestion}
                editQuestion={editQuestion}
                key={question.id}
              ></QuestionItem>
            </>
          );
        })}
      </List>

      <Button
        className={classes.submitButton}
        inputProps={{ "aria-label": "Submit Survey Form Button" }}
        variant="contained"
        color="primary"
        onClick={handleSubmit}
      >
        Display Survey
      </Button>
    </Card>
  );
};

export default withStyles(styles)(CreateQuestion);
