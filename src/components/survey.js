import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import "../styles/survey.css";

const socket = io("http://localhost:4000", {
  transports: ["websocket", "polling"],
});

socket.on("connect", () => {
  console.log("rick is here");
});

export default function Survey() {
  const [message, setMessage] = useState("");
  useEffect(() => {
    socket.on("chat-message", (message) => {
      console.log(`incoming message: ${message}`);
    });
  });

  const handleChange = (e) => {
    console.log(e.currentTarget.value);
    setMessage(e.currentTarget.value);
  };
  const submit = () => {
    socket.emit("text", message);
    setMessage("");
  };
  return (
    <div id="createQuestion">
      <h1>create a question:</h1>
      <input
        type="text"
        id="text-message"
        value={message}
        onChange={(e) => handleChange(e)}
      ></input>
      <button
        onClick={() => {
          submit();
        }}
      >
        submit
      </button>
    </div>
  );
}
