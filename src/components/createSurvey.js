import React, { useEffect } from "react";
import useToggle from "../custom-react-hooks/useToggle";
import socket from "../server/socketConfig";
import Input from "@material-ui/core/Input";
import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
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
  submitButton: {},
  list: {
    marginTop: "1rem",
  },
  surveyQuestion: {
    padding: "1rem ",
    fontSize: "15px",
    color: "dark-grey",
  },
  surveyResponse: {
    color: "grey",
    cursor: "pointer",
    "&:hover": {
      color: "#3f51b5",
      "&:hover $plusButton": {
        color: "#fff",
        background: "#3f51b5",
      },
      "&:hover $plusIcon": {
        stroke: "#fff",
        fill: "none",
      },
    },
  },
  plusIcon: {
    fill: "none",
    stroke: "#3f51b5",
  },
  plusButton: {
    display: "flex",
    alignItem: "center",
    justifyContent: "center",
    color: "#3f51b5",
    border: "none",
    borderRadius: "100%",
    marginRight: "1rem",
  },
};
const CreateQuestion = function ({
  toggleAwaitingAnswers,
  classes,
  setData,
  data,
  uId,
}) {
  const [showForm, toggleShowForm] = useToggle(false);
  const [showTitle, toggleShowTitle] = useToggle(false);

  const plusIcon = (
    <svg
      className={classes.plusIcon}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 11 11"
      width="11"
      height="11"
      overflow="visible"
      stroke="black"
      stroke-width="1"
    >
      <line x1="6" y1="0" x2="6" y2="11" />
      <line x1="0" y1="6" x2="11" y2="6" />
    </svg>
  );

  useEffect(() => {
    setData((data) => ({
      ...data,
      surveyId: `aa${uId()}bb`,
    }));
  }, []);

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

  const handleSubmit = function (e) {
    e.preventDefault();
    socket.emit("sentQuestion", data);
    toggleAwaitingAnswers();
  };

  const { createQuestion, surveyTitle } = data;
  return (
    <Card id="createQuestion" className={classes.root}>
      {showTitle ? (
        <>
          <Input
            className={classes.surveyQuestion}
            placeholder="e.g. What's your Favorite Ice Cream Flavor?"
            inputProps={{ "aria-label": "Survey Question" }}
            name="surveyTitle"
            value={surveyTitle}
            onChange={updateForm}
            disableUnderline
            autoFocus
          />

          <span className={classes.cancel} onClick={toggleShowTitle}>
            Cancel
          </span>
        </>
      ) : (
        <List className={classes.response}>
          <ListItem className={classes.surveyResponse}>
            <span
              className={classes.plusButton}
              aria-label="Open Create Survey Question Input"
              onClick={toggleShowTitle}
            >
              {plusIcon}
            </span>
            Add Survey Question
          </ListItem>
        </List>
      )}

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
      {showForm ? (
        <CreateQuestionForm
          addQuestion={addQuestion}
          toggleShowForm={toggleShowForm}
        />
      ) : (
        <List className={classes.response}>
          <ListItem className={classes.surveyResponse}>
            <span
              className={classes.plusButton}
              aria-label="Open Create Survey Response Form"
              onClick={toggleShowForm}
            >
              <svg
                className={classes.plusIcon}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 11 11"
                width="11"
                height="11"
                overflow="visible"
                stroke="black"
                stroke-width="1"
              >
                <line x1="6" y1="0" x2="6" y2="11" />
                <line x1="0" y1="6" x2="11" y2="6" />
              </svg>
            </span>
            Add Survey Response
          </ListItem>
        </List>
      )}

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
