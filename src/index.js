import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import theme from "./Styles/theme";
import { ThemeProvider } from "@material-ui/styles";

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
