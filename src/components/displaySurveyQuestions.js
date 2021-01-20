import React from "react";
import socket from "../server/socketConfig";
import useFormState from "../custom-react-hooks/form-state-hook";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import Input from "@material-ui/core/Input";
import Divider from "@material-ui/core/Divider";
import StyledButton from "../Styled/Button";
import { withStyles } from "@material-ui/core/styles";

const styles = {
  root: {
    maxWidth: "500px",
    display: "flex",
    flexDirection: "column",
    margin: "6rem auto",
    padding: "3rem",
  },
  title: {
    fontSize: "500",
    fontWeight: "bold",
    color: "black",
    textTransform: "uppercase",
    textAlign: "center",
  },
};
function DisplaySurveyQuestions({
  data,
  setData,
  handleSubmitAnswer,
  userName,
  classes,
}) {
  const [radio, updateRadio, clearRadio] = useFormState("");

  const title = data.surveyQuestion.surveyTitle;
  const questionsArray = data.createQuestion;
  const { surveyFRQuestion } = data;

  const updateForm = (e) => {
    setData({
      ...data,
      surveyFRQuestion: {
        ...data.surveyFRQuestion,
        [e.target.name]: e.target.value,
      },
    });
  };

  const handleSubmit = () => {
    let responseData, updateData;
    if (data.isStored && data.surveyResults >= 1) {
      updateData = { ...data };
      updateData.surveyResults.forEach((storedResult) => {
        if (storedResult.userName === userName) {
          storedResult.response = radio;
        }
      });
    } else {
      if (Object.keys(surveyFRQuestion).length !== 0) {
        let input = Object.values(surveyFRQuestion)[0];
        responseData = { userName, response: `${radio}: ${input}` };
        console.log({ surveyFRQuestion, radio });
      } else {
        responseData = { userName, response: radio };
      }

      updateData = {
        ...data,
        // surveyResults: [...data.surveyResults, responseData], try removing surveyResults spread to see if data overwrites okay
        surveyResults: [responseData],
      };
    }
    socket.emit("submitAnswer", updateData);
    handleSubmitAnswer();
    clearRadio();
  };

  return (
    <div className={classes.root}>
      <FormControl component="fieldset">
        <FormLabel className={classes.title} component="legend">
          {title}
        </FormLabel>
        <RadioGroup
          aria-label="Answers"
          name="Answers"
          value={radio}
          onChange={updateRadio}
        >
          {questionsArray.map(function (arr) {
            if (!arr.isFreeResponse) {
              return (
                <FormControlLabel
                  key={arr.id}
                  value={arr.question}
                  control={<Radio />}
                  label={arr.question}
                />
              );
            } else {
              return (
                <>
                  <FormControlLabel
                    key={arr.id}
                    value={arr.question}
                    control={<Radio />}
                    label={arr.question}
                  />
                  <Input
                    placeholder="Response"
                    inputProps={{ "aria-label": "description" }}
                    name={`response ${arr.id}`}
                    value={surveyFRQuestion[`response ${arr.id}`]}
                    disabled={!(radio === arr.question)}
                    onChange={updateForm}
                    disableUnderline
                  />
                  <Divider />
                </>
              );
            }
          })}
        </RadioGroup>
      </FormControl>
      <StyledButton
        label="submit"
        colorType="primary"
        handleClick={handleSubmit}
      />
    </div>
  );
}
export default withStyles(styles)(DisplaySurveyQuestions);
