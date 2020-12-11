import React, { useState, useRef, useEffect } from "react";
import useToggle from "../custom-react-hooks/useToggle";
import Navbar from "../components/navbar";
import CreateQuestion from "./createQuestion";
import DisplaySurveyQuestions from "./displaySurveyQuestions";
import SurveyResponses from "./surveyResponses";
import SurveyResults from "./surveyResults";
import socket from "../server/socketConfig";
import Card from "@material-ui/core/Card";
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
  const [userName, setUserName] = useState(`user ${uniqueId()}`);
  const [questionDisplayed, toggleQuestionDisplayed] = useToggle(false);
  const [ResultsDialogOpen, toggleResultsDialog] = useToggle(false);
  const [surveyResponses, setSurveyResponses] = useState([]);
  const [surveyResults, setSurveyResults] = useState(false);
  const [pastResults, setPastResults] = useState([]);
  function uniqueId() {
    return Math.floor(Math.random() * 1000);
  }

  let surveyData = {
    surveyId: "",
    surveyQuestion: { surveyTitle: "", q1: "", q2: "", q3: "", q4: "" },
    surveyResults: [],
  };

  const [data, setData] = useState(surveyData);

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
    socket.on("surveyQuestion", function (data) {
      const { surveyQuestion } = data;
      surveyFormData.current = surveyQuestion;
      setData({ ...data });
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
      setData({
        ...data,
        surveyResults: [...data.surveyResults, ans],
      });
    });
  }, [data]);

  const closeSurvey = function () {
    const { surveyResults } = data;
    socket.emit("surveyResults", surveyResults);
    toggleAwaitingAnswers();
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
    socket.on("results", function (results) {
      console.log("results", results);
      setSurveyResults(results);
      setData({
        ...data,
        surveyResults: [...data.surveyResults, results],
      });
      toggleResultsDialog();
    });
  }, []);

  const handleCloseResults = function () {
    toggleResultsDialog();
    //save all data and reset values
  };
  useEffect(() => {
    console.log("pastresutls", pastResults);
  }, [pastResults]);
  return (
    <div className={classes.root}>
      <Navbar userName={userName} setUserName={setUserName} />

      {loggedin && !awaitingAnswers && (
        <CreateQuestion
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

      <Card>
        {questionDisplayed && !loggedin && (
          <DisplaySurveyQuestions
            formData={surveyFormData.current}
            handleSubmitAnswer={submitAnswer}
            userName={userName}
          />
        )}
      </Card>

      {data.surveyResults.length ? <SurveyResponses data={data} /> : ""}

      <SurveyResults
        onClose={handleCloseResults}
        open={ResultsDialogOpen}
        surveyResults={surveyResults}
      />
      <div>
        <ul>
          {pastResults.map((item, idx) => {
            return (
              <div>
                <h3>{`${item.title}`}</h3>
                <li key={idx}> {`${item.userName} : ${item.ans}`} </li>
              </div>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
export default withStyles(styles)(Survey);
