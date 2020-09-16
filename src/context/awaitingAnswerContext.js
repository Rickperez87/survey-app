import React, { createContext } from "react";
import useToggle from "../custom-react-hooks/useToggle";

export const AwaitingAnswersContext = createContext();
export function AwaitingAnswersProvider(props) {
  const [awaitingAnswers, toggleAwaitingAnswers] = useToggle(false);
  return (
    <AwaitingAnswersContext.Provider
      value={(awaitingAnswers, toggleAwaitingAnswers)}
    >
      {props.children}
    </AwaitingAnswersContext.Provider>
  );
}
