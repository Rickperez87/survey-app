import { createMuiTheme } from "@material-ui/core/styles";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#0984e3",
    },
    secondary: {
      main: "#d64045",
    },
  },
  props: {
    MuiButton: {
      disableElevation: true,
      disableFocusRipple: true,
      disableTouchRipple: true,
    },
  },
  overrides: {
    MuiButton: {
      root: {
        textTransform: "none",
        fontSize: "1rem",
        padding: ".25rem .5rem",
        margin: "0 .25rem",
      },
      contained: {},
    },
    MuiDialog: {
      paper: {
        padding: "2rem",
      },
    },
    MuiCard: {
      root: {
        padding: "1rem 2rem",
      },
    },
  },
  typography: {
    // fontFamily: '',
    fontSize: 16,
  },
});

export default theme;
