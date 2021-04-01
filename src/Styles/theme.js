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
        fontSize: "1.6rem",
        padding: ".4rem .8rem",
        margin: "0 .4rem",
      },
      contained: {},
    },
    MuiSvgIcon: {
      root: {
        width: "2.5rem",
        height: "2.5rem",
      },
    },

    MuiDialog: {
      paper: {
        padding: "3.2rem",
      },
    },
    MuiCard: {
      root: {
        padding: "1.6rem 3.2rem",
      },
    },
  },
  typography: {
    // fontFamily: '',
    fontSize: "1.6rem",
  },
});

export default theme;
