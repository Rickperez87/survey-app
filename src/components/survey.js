import React, { useState, useEffect } from "react";
import useFormState from "../custom-react-hooks/form-state-hook";
import useToggle from "../custom-react-hooks/useToggle";
import Navbar from "../components/navbar";
import Login from "./login";
import CreateQuestion from "./createQuestion";
import DisplaySurveyQuestions from "./displaySurveyQuestions";
import SurveyResponses from "./surveyResponses";
import SurveyResults from "./surveyResults";
import io from "socket.io-client";
import Card from "@material-ui/core/Card";
import Button from "@material-ui/core/Button";

const socket = io("http://localhost:4000", {
  transports: ["websocket", "polling"],
});

socket.on("connect", function () {
  console.log("Client Connected");
});

export default function Survey() {
  const [awaitingAnswers, toggleAwaitingAnswers] = useToggle(false);
  const [surveyQuestion, setSurveyQuestion] = useState([]);
  const [surveyResponses, setSurveyResponses] = useState([]);
  const [surveyResults, setSurveyResults] = useState(false);
  const [adminId, setAdminId] = useState("");
  const [surveyAnswers, setSurveyAnswers] = useState([]);
  const [loggedin, toggleLoggedin] = useToggle(false);
  const [loginLink, toggleLoginLink] = useToggle(false);
  const [questionDisplayed, toggleQuestionDisplayed] = useToggle(false);
  const [radio, updateRadio, clearRadio] = useFormState("");

  useEffect(function () {
    socket.on(
      "surveyQuestion",
      function (surveyQuestion) {
        console.log(`incoming message: ${surveyQuestion}`);
        setSurveyQuestion(surveyQuestion[0]);
        surveyQuestion.shift();
        console.log({ surveyQuestion });
        console.log({ surveyAnswers });
        setSurveyAnswers([...surveyQuestion]);
        setSurveyResults(false);
        toggleQuestionDisplayed();
        toggleAwaitingAnswers();
        //this is broadcasting on survey question creation. set this to toggleawaitinganswers also.
        //toggle question will close out the on second time submitting question. What need to do is display results to all and that function toggle display question off. Then on next submit will toggle on.
      },
      []
    );
  });

  socket.on("confirmLogin", function (adminId) {
    console.log("login successful", adminId);
    setAdminId(adminId);
    toggleLoggedin();
  });

  const submitAnswer = function () {
    console.log(`submitted ${radio}`);
    socket.emit("submitAnswer", radio);
    toggleAwaitingAnswers();
    clearRadio();
  };

  socket.on("receiveAnswer", function (ans) {
    let result = [...surveyResponses, ans];
    setSurveyResponses(result);
    setSurveyAnswers([]);
  });
  socket.on("results", function (results) {
    setSurveyResults(results);
    setSurveyAnswers([]);
    setSurveyResponses([]);
    //transmits to all exept sender
  });

  // const submit = function () {
  // setSurveyResults(false);
  // console.log(createSurveyQuestion);
  // let text = [...createSurveyQuestion];
  // console.log("checking if text is set", text);
  // socket.emit("sentQuestion", text);

  // toggleAwaitingAnswers();
  // };

  const closeSurvey = function () {
    socket.emit("surveyResults", surveyResponses);
    toggleAwaitingAnswers();
  };

  return (
    <div>
      <Navbar toggleLoginLink={toggleLoginLink} />

      {loginLink && (
        <Login
          socket={socket}
          loggedin={loggedin}
          questionDisplayed={questionDisplayed}
          className={loggedin ? "hidden" : ""}
        />
      )}
      <div className={awaitingAnswers ? "hidden" : "createQuestionContainer"}>
        <CreateQuestion
          loggedin={loggedin}
          setSurveyQuestion={setSurveyQuestion}
          socket={socket}
          toggleAwaitingAnswers={toggleAwaitingAnswers}
        />
      </div>
      <div
        className={awaitingAnswers && loggedin ? "awaitingAnswers" : "hidden"}
      >
        <h1>Awaiting Answers...</h1>
        <Button variant="contained" color="secondary" onClick={closeSurvey}>
          Close Survey
        </Button>
      </div>
      <Card>
        {questionDisplayed && (
          <DisplaySurveyQuestions
            socket={socket}
            loggedin={loggedin}
            questionDisplayed={questionDisplayed}
            toggleQuestionDisplayed={toggleQuestionDisplayed}
            toggleAwaitingAnswers={toggleAwaitingAnswers}
            surveyQuestion={surveyQuestion}
            surveyAnswers={surveyAnswers}
            radio={radio}
            updateRadio={updateRadio}
            clearRadio={clearRadio}
            adminId={adminId}
            handleSubmitAnswer={submitAnswer}
          />
        )}
      </Card>

      <div className="surveyResponse">
        <SurveyResponses surveyResponses={surveyResponses} />
      </div>

      <SurveyResults surveyResults={surveyResults} />
      {/* need to transmit survey responses on close survey to all. Then reset logic so we can ask the next question. */}
      {/* make this into a dialog box? */}
    </div>
  );
}
