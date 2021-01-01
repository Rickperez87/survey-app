import React, { useState, useRef, useEffect } from "react";
import useToggle from "../custom-react-hooks/useToggle";
import CreateQuestion from "./createQuestion";
import CreateSurvey from "./createSurvey";
import DisplaySurveyQuestions from "./displaySurveyQuestions";
import SurveyResponses from "./surveyResponses";
import SurveyResults from "./surveyResults";
import DrawerData from "./drawer";
import DisplayFRQuestions from "./DisplayFreeResponseQuestions";
import socket from "../server/socketConfig";
import AwaitingAnswers from "./awaitingAnswers";
import bg from "../styles/bg.svg";

import { withStyles } from "@material-ui/core/styles";

const styles = {
  root: {
    /* background by SVGBackgrounds.com */
    backgroundColor: "#fcfcfc",
    backgroundImage: `url(${bg})`,
    height: "100vh",
    overflow: "scroll",
  },
};

//In the future: refactor to split admin socket from other user sockets. then can refactor the way things are laid out and use fewer toggles
function Survey({ classes }) {
  const [loggedin, toggleLoggedin] = useToggle(false);
  const [awaitingAnswers, toggleAwaitingAnswers] = useToggle(false);
  const [userName, setUserName] = useState(`User ${uniqueId()}`);
  const [questionDisplayed, toggleQuestionDisplayed] = useToggle(false);
  const [surveyType, setSurveyType] = useState(false);
  const [ResultsDialogOpen, toggleResultsDialog] = useToggle(false);
  const [surveyResults, setSurveyResults] = useState(false);
  const [storeData, setStoreData] = useState([]);
  function uniqueId() {
    return Math.floor(Math.random() * 1000);
  }

  let dataSchema = {
    surveyId: "",
    createQuestion: [],
    surveyQuestion: { surveyTitle: "", q1: "", q2: "", q3: "", q4: "" },
    surveyFRQuestion: { response: "" },
    surveyResults: [],
  };

  const [data, setData] = useState(dataSchema);
  let surveyFormData = useRef("");

  useEffect(() => {
    socket.on("connect", function () {
      console.log("Client Connected");
    });
    return () => socket.off("connect");
  }, []);

  useEffect(() => {
    socket.on("confirmLogin", function () {
      toggleLoggedin();
    });

    return () => {
      socket.off("confirmLogin");
    };
  }, []);

  useEffect(() => {
    socket.on("surveyQuestion", function (incomingData) {
      setData({
        ...data,
        ...incomingData,
      });
      toggleQuestionDisplayed();
      toggleAwaitingAnswers();
    });
    return () => socket.off("surveyQuestion");
  }, []);

  const submitAnswer = function () {
    toggleAwaitingAnswers();
    toggleQuestionDisplayed();
  };

  useEffect(() => {
    socket.on("receiveAnswer", function (ans) {
      setData((data) => ({
        ...data,
        surveyQuestion: { ...data.surveyQuestion },
        surveyResults: [...data.surveyResults, ans],
      }));
    });
  }, []);

  const closeSurvey = function () {
    //save all data and reset values
    setStoreData([...storeData, data]);
    setData(dataSchema);

    const { surveyResults } = data;
    socket.emit("surveyResults", surveyResults);

    toggleResultsDialog();
  };
  const cancelSurvey = function () {
    socket.emit("cancelSurveyResults");
    toggleAwaitingAnswers();
  };
  useEffect(() => {
    socket.on("cancelSurveyResults", function () {
      setSurveyResults(false);
      toggleAwaitingAnswers();
      toggleQuestionDisplayed();
    });
  }, [questionDisplayed]);

  useEffect(() => {
    socket.on("results", function (resp) {
      setSurveyResults(resp);

      toggleResultsDialog();
    });
  }, []);

  const handleCloseResults = function () {
    toggleResultsDialog();
    toggleAwaitingAnswers();
  };
  useEffect(() => {}, [data]);

  const {
    surveyQuestion: { surveyTitle },
  } = data;
  return (
    <div className={classes.root}>
      <DrawerData
        userName={userName}
        setUserName={setUserName}
        data={storeData}
      />
      {/* {loggedin && !awaitingAnswers && (
        <CreateQuestion
          className="createQuestionContainer"
          toggleAwaitingAnswers={toggleAwaitingAnswers}
          data={data}
          setData={setData}
          uId={uniqueId}
        />
      )} */}
      {loggedin && !awaitingAnswers && (
        <CreateSurvey
          className="createQuestionContainer"
          toggleAwaitingAnswers={toggleAwaitingAnswers}
          data={data}
          setData={setData}
          uId={uniqueId}
        />
      )}
      {awaitingAnswers && loggedin && (
        <AwaitingAnswers
          className="awaitingAnswers"
          handleCloseSurvey={closeSurvey}
          handleCancelSurvey={cancelSurvey}
        />
      )}
      {questionDisplayed && !loggedin && (
        <DisplaySurveyQuestions
          formData={data}
          handleSubmitAnswer={submitAnswer}
          userName={userName}
        />
      )}
      {data.surveyResults.length ? <SurveyResponses data={data} /> : ""}
      <SurveyResults
        onClose={handleCloseResults}
        open={ResultsDialogOpen}
        surveyResults={surveyResults}
        surveyTitle={surveyTitle}
      />
    </div>
  );
}
export default withStyles(styles)(Survey);
