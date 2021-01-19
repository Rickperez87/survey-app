import React, { useEffect, useState } from "react";
import ShowForm from "./showForm";
import useToggle from "../custom-react-hooks/useToggle";
import socket from "../server/socketConfig";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import QuestionItem from "./questionItem";
import FormItem from "./formItem";
import Card from "@material-ui/core/Card";
import { v4 as uuid } from "uuid";
import CreateTitleForm from "./createTitleForm";
import CreateQuestionForm from "./CreateQuestionForm";
import { withStyles } from "@material-ui/core/styles";

const styles = {
  root: {
    maxWidth: "42.5rem",
    display: "flex",
    flexDirection: "column",
    margin: "4rem auto",
    padding: "2rem 6rem",

    "& Input": {
      padding: "1rem 0",
    },
  },
  submitButton: {
    fontSize: ".8rem",
  },
  titleQuestion: {
    textAlign: "center",
    fontSize: "2rem",
    fontWeight: 700,
  },
  list: {
    marginTop: "1rem",
  },
  surveyQuestion: {},

  cancel: {
    cursor: "pointer",
    padding: "1rem",
    "&:hover": {
      textDecoration: "underline",
    },
  },
};
const CreateQuestion = function ({
  toggleAwaitingAnswers,
  classes,
  setData,
  data,
  uId,
  storeSurvey,
}) {
  const [showForm, toggleShowForm] = useToggle(false);
  const [showTitle, toggleShowTitle] = useToggle(false);
  const [titleIsActive, toggleTitleIsActive] = useToggle(false);
  const [responseIsActive, toggleResponseIsActive] = useToggle(false);
  const [isStoring, setIsStoring] = useState(false);

  useEffect(() => {
    setData((data) => ({
      ...data,
      surveyId: `aa${uId()}bb`,
    }));
  }, [isStoring]);

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
    if (data.createQuestion.length === 0) {
      toggleResponseIsActive();
    }
    setData({
      ...data,
      createQuestion: [
        ...data.createQuestion,
        { id: uuid(), question, isFreeResponse },
      ],
    });
  };
  const removeQuestion = (id) => {
    if (data.createQuestion.length === 1) {
      toggleResponseIsActive();
    }
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

  const removeTitle = () => {
    setData({
      ...data,
      surveyQuestion: {
        surveyTitle: "",
      },
    });
  };
  const editTitle = (val) => {
    setData({
      ...data,
      surveyQuestion: {
        ...data.surveyQuestion,
        surveyTitle: val,
      },
    });
  };

  const handleSubmit = function (e) {
    e.preventDefault();
    socket.emit("sentQuestion", data);
    toggleAwaitingAnswers();
  };
  function handleStoreSurvey() {
    storeSurvey();
    toggleTitleIsActive();
    toggleResponseIsActive();
    toggleShowForm();
    setIsStoring(!isStoring);
  }

  const {
    createQuestion,
    surveyQuestion: { surveyTitle },
  } = data;

  return (
    <Card id="createQuestion" className={classes.root}>
      <h1 className={classes.titleQuestion}>Create Survey</h1>
      {titleIsActive && (
        <FormItem
          className={classes.listItem}
          renderText={surveyTitle}
          key={surveyTitle}
          toggleIsActive={toggleTitleIsActive}
          remove={removeTitle}
          edit={editTitle}
        />
      )}

      {showTitle ? (
        <CreateTitleForm
          toggleIsActive={toggleTitleIsActive}
          surveyTitle={surveyTitle}
          updateForm={updateForm}
          toggleShowForm={toggleShowTitle}
        />
      ) : (
        !titleIsActive && (
          <ShowForm
            toggleShowForm={toggleShowTitle}
            className={classes.response}
            renderText={"Add Survey Question"}
          ></ShowForm>
        )
      )}
      {responseIsActive && (
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
                />
              </>
            );
          })}
        </List>
      )}
      {showForm ? (
        <CreateQuestionForm
          addQuestion={addQuestion}
          toggleShowForm={toggleShowForm}
          toggleIsActive={toggleResponseIsActive}
        />
      ) : (
        <ShowForm
          toggleShowForm={toggleShowForm}
          className={classes.response}
          renderText={"Add Survey Response"}
        ></ShowForm>
      )}
      <ButtonGroup size="large" style={{ margin: "1rem, auto" }}>
        <Button
          className={classes.submitButton}
          inputProps={{ "aria-label": "Submit Survey Form to Users Button" }}
          variant="contained"
          color="primary"
          onClick={handleSubmit}
        >
          Create
        </Button>
        <Button
          className={classes.submitButton}
          inputProps={{ "aria-label": "Store Survey for Later Use Button" }}
          variant="contained"
          color="secondary"
          onClick={handleStoreSurvey}
        >
          Store
        </Button>
      </ButtonGroup>
    </Card>
  );
};

export default withStyles(styles)(CreateQuestion);
