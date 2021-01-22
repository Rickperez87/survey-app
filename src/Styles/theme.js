import { createMuiTheme } from "@material-ui/core/styles";

const theme = createMuiTheme({
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
