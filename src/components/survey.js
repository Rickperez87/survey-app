import React, { useState, useEffect } from "react";
import useFormState from "../custom-react-hooks/form-state-hook";
import useToggle from "../custom-react-hooks/useToggle";
import io from "socket.io-client";
import Admin from "./admin";
import "../styles/survey.css";

const socket = io("http://localhost:4000", {
  transports: ["websocket", "polling"],
});

socket.on("connect", () => {
  console.log("rick is here");
});

export default function Survey() {
  const [message, updateMessage, clearMessage] = useFormState("");
  const [displaySurveyQuestion, setSurveyQuestion] = useState([]);
  const [loggedin, toggleLoggedin] = useToggle(false);

  useEffect(() => {
    socket.on("chat-message", (surveyQuestion) => {
      console.log(`incoming message: ${surveyQuestion}`);
      setSurveyQuestion([surveyQuestion]);
    });
    socket.on("confirmLogin", () => {
      console.log("login successful");
      toggleLoggedin();
    });
  });

  const submit = () => {
    socket.emit("text", message);
    clearMessage();
  };
  return (
    <div>
      <div className={loggedin ? "hidden" : "login-Container"}>
        <h1 className={loggedin ? "hidden" : ""}>Admin Login</h1>
        <Admin socket={socket} className={loggedin ? "hidden" : ""} />
      </div>
      <div
        id="createQuestion"
        className={loggedin ? "createQuestion" : "hidden"}
      >
        <h1>create a question:</h1>
        <input
          type="text"
          id="text-message"
          value={message}
          onChange={updateMessage}
        ></input>
        <button
          onClick={() => {
            submit();
          }}
        >
          submit
        </button>
      </div>
      <ul className="displayMessage">
        {displaySurveyQuestion.map((surveyQuestion) => (
          <li>{surveyQuestion}</li>
        ))}
      </ul>
    </div>
  );
}
