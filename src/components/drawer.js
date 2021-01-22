import React from "react";
import clsx from "clsx";
import socket from "../server/socketConfig";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import StyledButton from "../Styled/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Navbar from "./Navbar";

const drawerWidth = 400;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    width: "100%",
  },
  appBar: {
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginLeft: "4rem",
  },
  hide: {
    display: "none",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: "center",
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
  dataRoot: {
    display: "flex",
    flexDirection: " column",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  surveyBox: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  surveyTitle: {
    textTransform: "capitalize",
    display: "inline-block",
  },
  dataItems: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    margin: "0 1rem",
  },
  divider: {
    width: "100%",
  },
  drawerHeader_Title: {
    fontSize: "1.2rem",
  },
}));

export default function DrawerData({
  userName,
  setUserName,
  data,
  setData,
  toggleAwaitingAnswers,
  loggedin,
}) {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const displaySurvey = (e, data) => {
    e.preventDefault();
    setData(data);
    socket.emit("sentQuestion", data);
    toggleAwaitingAnswers();
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="relative"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          {loggedin && (
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              className={clsx(classes.menuButton, open && classes.hide)}
            >
              <MenuIcon />
            </IconButton>
          )}
          <Navbar userName={userName} setUserName={setUserName} />
        </Toolbar>
      </AppBar>

      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <h3 className={classes.drawerHeader_Title}>Saved Questions</h3>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "ltr" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </div>
        <List className={classes.dataRoot}>
          {data.map((data) => {
            return (
              <>
                <div className={classes.surveyBox}>
                  Question:{" "}
                  <h3
                    key={data.surveyId}
                    className={classes.surveyTitle}
                  >{`${data.surveyQuestion.surveyTitle}`}</h3>
                  {data.surveyResults.map((survey, idx) => {
                    return (
                      <ListItem key={idx}>
                        {" "}
                        Responses:
                        <ListItemText
                          className={classes.dataItems}
                          primary={`${survey.userName}: ${survey.response}`}
                        />
                      </ListItem>
                    );
                  })}
                  <StyledButton
                    colorType="primary"
                    handleClick={(e) => displaySurvey(e, data)}
                    label="Display Survey"
                  />
                </div>
                <Divider
                  key={data.surveyId}
                  variant="inset"
                  className={classes.divider}
                />
              </>
            );
          })}
        </List>
      </Drawer>
    </div>
  );
}
