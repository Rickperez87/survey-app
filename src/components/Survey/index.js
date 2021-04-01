import React, { useState, useEffect } from "react";
import socket from "../../server/socketConfig";
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/core/styles";
import useToggle from "../../custom-react-hooks/useToggle";
import CreateSurvey from "../createSurvey";
import DisplaySurveyQuestions from "../displaySurveyQuestions";
import SurveyResponses from "../surveyResponses";
import SurveyResults from "../surveyResults";
import DrawerData from "../drawer";
import AwaitingAnswers from "../awaitingAnswers";
import AwaitingSurvey from "../awaitingSurvey";

const styles = {
  root: {
    background: "#f5f6fa",
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
    socket.on("receiveAnswer", function (newData) {
      setData((data) => ({
        ...data,
        surveyResults: [...data.surveyResults, ...newData.surveyResults],
      }));
    });
  }, []);

  const closeSurvey = function () {
    const { surveyResults } = data;
    socket.emit("surveyResults", surveyResults);
    toggleResultsDialog();
  };

  const saveData = () => {
    if (data.isStored) {
      let updateStoreData = storeData.slice();
      updateStoreData.map((survey) => {
        if (survey.surveyId === data.surveyId) {
          survey.surveyResults = data.surveyResults;
        }
      });
      setStoreData(updateStoreData);
    } else {
      let storedData = Object.assign(data, { isStored: true });
      setStoreData([...storeData, storedData]);
    }
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

  const onCloseDialog = function () {
    toggleResultsDialog();
    if (loggedin) {
      toggleAwaitingAnswers();
      setSurveyResults(false);
      //save all data and reset values
      saveData();
    }
  };

  const {
    surveyQuestion: { surveyTitle },
  } = data;

  return (
    <Grid
      container
      alignItems="center"
      alignContent="flex-start"
      justify="center"
      className={classes.root}
    >
      <DrawerData
        loggedin={loggedin}
        toggleAwaitingAnswers={toggleAwaitingAnswers}
        userName={userName}
        setUserName={setUserName}
        data={storeData}
        setData={setData}
      />
      <Grid item xs={12} sm={10} md={8} lg={6} xl={4}>
        {loggedin && !awaitingAnswers && (
          <CreateSurvey
            toggleAwaitingAnswers={toggleAwaitingAnswers}
            data={data}
            setData={setData}
            uId={uniqueId}
            storeSurvey={saveData}
          />
        )}
        {awaitingAnswers && loggedin && (
          <AwaitingAnswers
            handleCloseSurvey={closeSurvey}
            handleCancelSurvey={cancelSurvey}
          />
        )}
        {!questionDisplayed && !loggedin && <AwaitingSurvey />}
        {questionDisplayed && !loggedin && (
          <DisplaySurveyQuestions
            data={data}
            setData={setData}
            handleSubmitAnswer={submitAnswer}
            userName={userName}
          />
        )}
        {loggedin && awaitingAnswers && data.surveyResults.length ? (
          <SurveyResponses setData={setData} data={data} />
        ) : (
          ""
        )}
        <SurveyResults
          onClose={onCloseDialog}
          open={ResultsDialogOpen}
          surveyResults={surveyResults}
          surveyTitle={surveyTitle}
        />
      </Grid>
    </Grid>
  );
}

export default withStyles(styles)(Survey);
