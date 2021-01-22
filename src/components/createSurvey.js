import React, { useEffect, useState } from "react";
import ShowForm from "./showForm";
import useToggle from "../custom-react-hooks/useToggle";
import socket from "../server/socketConfig";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import QuestionItem from "./questionItem";
import FormItem from "./formItem";
import { v4 as uuid } from "uuid";
import CreateTitleForm from "./createTitleForm";
import CreateQuestionForm from "./CreateQuestionForm";
import StyledButton from "../Styled/Button";
import CreateForm from "../components/CreateForm";
import { withStyles } from "@material-ui/core/styles";

const styles = {
  root: {
    background: "#fff",
    maxWidth: "45.5rem",
    display: "flex",
    flexDirection: "column",
    margin: "4rem auto",
    boxShadow: "0px 1px 2px 0px rgba(0,0,0,0.33)",

    "& Input": {
      padding: "1rem 0",
    },
  },
  submitButton: {
    fontSize: ".8rem",
    padding: ".5 1.5rem",
  },
  titleQuestion: {
    textAlign: "start",
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
  buttonGroup: {
    paddingTop: ".5rem",
    alignSelf: "flex-end",
    minWidth: "230px",
    display: "flex",
    justifyContent: "flex-end",
  },
  header: {
    padding: "6rem 6rem 2rem 6rem",
    // border: "1px solid black",
  },
  main: {
    padding: "0 6rem 6rem 6rem",
    // display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "flex-start",
  },
  showFrom: {
    margin: "2rem 0",
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
  const [showTitle, toggleShowTitle] = useToggle(true);
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
    <div id="createQuestion" className={classes.root}>
      <header className={classes.header}>
        <h1 className={classes.titleQuestion}>Create Survey</h1>
      </header>
      <main className={classes.main}>
        {titleIsActive && (
          <FormItem
            className={classes.listItem}
            renderText={surveyTitle}
            toggleIsActive={toggleTitleIsActive}
            remove={removeTitle}
            edit={editTitle}
            key={surveyTitle}
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
              className={classes.showform}
              toggleShowForm={toggleShowTitle}
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
            toggleIsActive={toggleResponseIsActive}
            addQuestion={addQuestion}
            toggleShowForm={toggleShowForm}
          />
        ) : (
          <ShowForm
            className={classes.showform}
            toggleShowForm={toggleShowForm}
            renderText={"Add Survey Responses"}
          ></ShowForm>
        )}
        <ButtonGroup size="large" className={classes.buttonGroup}>
          <StyledButton
            label="create"
            colorType="primary"
            handleClick={handleSubmit}
          />

          <StyledButton
            variant="contained"
            label="store"
            colorType="secondary"
            handleClick={handleStoreSurvey}
          />
        </ButtonGroup>
      </main>
      {/* <CreateForm></CreateForm> */}
    </div>
  );
};

export default withStyles(styles)(CreateQuestion);
