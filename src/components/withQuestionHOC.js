import React from "react";

const WithQuestionHOC = (WrappedComponent) => (props) => {
  return <WrappedComponent>{props.children}</WrappedComponent>;
};
