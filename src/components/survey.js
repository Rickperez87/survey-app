import React, { useState, useEffect } from "react";
import useToggle from "../custom-react-hooks/useToggle";
import CreateSurvey from "./createSurvey";
import DisplaySurveyQuestions from "./displaySurveyQuestions";
import SurveyResponses from "./surveyResponses";
import SurveyResults from "./surveyResults";
import DrawerData from "./drawer";
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
  const [ResultsDialogOpen, toggleResultsDialog] = useToggle(false);
  const [surveyResults, setSurveyResults] = useState(false);
  const [storeData, setStoreData] = useState([]);
  function uniqueId() {
    return Math.floor(Math.random() * 1000);
  }

  let dataSchema = {
    surveyId: "",
    createQuestion: [],
    surveyQuestion: { surveyTitle: "" },
    surveyFRQuestion: {},
    surveyResults: [],
  };

  const [data, setData] = useState(dataSchema);

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
        // surveyQuestion: { ...data.surveyQuestion },
        surveyResults: [...data.surveyResults, ans],
      }));
    });
  }, []);

  const closeSurvey = function () {
    const { surveyResults } = data;
    socket.emit("surveyResults", surveyResults);
    toggleResultsDialog();
  };
  const saveData = () => {
    setStoreData([...storeData, data]);
    setData(dataSchema);
  };

  const cancelSurvey = function () {
    socket.emit("cancelSurveyResults");
    toggleAwaitingAnswers();
    setSurveyResults(false);
    setData(dataSchema);
  };
  useEffect(() => {
    socket.on("cancelSurveyResults", function () {
      setData(dataSchema);
      // toggleAwaitingAnswers();
      if (questionDisplayed) {
        toggleQuestionDisplayed();
      }
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
    //save all data and reset values
    saveData();
  };

  const {
    surveyQuestion: { surveyTitle },
  } = data;
  return (
    <div className={classes.root}>
      <DrawerData
        toggleAwaitingAnswers={toggleAwaitingAnswers}
        userName={userName}
        setUserName={setUserName}
        data={storeData}
      />

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
          data={data}
          setData={setData}
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
