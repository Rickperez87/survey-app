import React, { useState } from "react";
import Switch from "@material-ui/core/Switch";

export default function Switches(getSurvey) {
  const [surveyType, setSurveyType] = useState("multiChoice");

  const handleSwitch = () => {
    console.log("handleSwitch", surveyType);
    if (surveyType === "multiChoice") {
      setSurveyType("freeResponse");
    } else {
      setSurveyType("multiChoice");
    }
    getSurvey(surveyType);
  };
  return (
    <Switch
      onChange={handleSwitch}
      name="checkedA"
      inputProps={{ "aria-label": "secondary checkbox" }}
    />
  );
}
