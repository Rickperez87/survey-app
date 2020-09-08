import React, { useState, useEffect } from "react";
import useFormState from "../custom-react-hooks/form-state-hook";
import io from "socket.io-client";
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

  useEffect(() => {
    socket.on("chat-message", (surveyQuestion) => {
      console.log(`incoming message: ${surveyQuestion}`);
      setSurveyQuestion([surveyQuestion]);
    });
  });

  const submit = () => {
    socket.emit("text", message);
    clearMessage();
  };
  return (
    <div id="createQuestion">
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
      <ul className="displayMessage">
        {displaySurveyQuestion.map((surveyQuestion) => (
          <li>{surveyQuestion}</li>
        ))}
      </ul>
    </div>
  );
}
