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
        padding: ".5rem 1.5rem",
      },
      contained: {},
    },
  },
  typography: {
    // fontFamily: '',
    fontSize: 16,
  },
});

export default theme;
