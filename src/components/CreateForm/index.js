import React from "react";
import useFormState from "../../custom-react-hooks/form-state-hook";
import useToggle from "../../custom-react-hooks/useToggle";
import { makeStyles } from "@material-ui/core/styles";
import Input from "@material-ui/core/Input";
import StyledButton from "../../Styled/Button";
import Checkbox from "@material-ui/core/Checkbox";

const useStyles = makeStyles((theme) => ({
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  form: {
    width: "100%",
    border: "1px solid",
    borderRadius: "5px",
  },
  button: {
    display: "inline-block",
  },
  cancel: {
    cursor: "pointer",
    padding: ".5rem 1rem",
    "&:hover": {
      textDecoration: "underline",
    },
  },
  buttonGroup: {
    display: "flex",
    alignItem: "center",
    justifyContent: "flex-start",
    margin: "1rem 0",
  },
}));

function CreateForm({ children, addQuestion, toggleShowForm }) {
  const classes = useStyles();
  const [val, setVal, clear] = useFormState("");
  //   const [isFreeResponse, toggleisFreeResponse] = useToggle(false);
  //   const [checked, toggleCheck] = useToggle(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // addQuestion(val, isFreeResponse);
    clear();
    // clearToggle();
  };
  //   const clearToggle = () => {
  //     if (checked) toggleCheck();
  //     if (isFreeResponse) toggleisFreeResponse();
  //   };
  return (
    <>
      <form
        className={classes.form}
        onSubmit={(e) => {
          handleSubmit(e);
          //   clearToggle();
        }}
      >
        {/* <Input
          style={{ display: "block" }}
          className={classes.input}
          name="input"
          placeholder="e.g. Vanilla"
          inputProps={{ "aria-label": "Add Multi-Choice Response " }}
          value={val}
          onChange={setVal}
          disableUnderline
          autoFocus
        />
        <div style={{ display: "flex", alignItems: "center" }}>
          <Checkbox
            style={{ display: "block" }}
            onChange={toggleisFreeResponse}
            checked={checked}
            onClick={toggleCheck}
            label="Free Response"
          ></Checkbox>
          Free Response
        </div> */}
        {children}
      </form>
      <div className={classes.buttonGroup}>
        <StyledButton
          colorType="primary"
          type="submit"
          handleClick={(e) => handleSubmit(e)}
          label="Add Response"
        />
        <span className={classes.cancel} onClick={toggleShowForm}>
          Cancel
        </span>
      </div>
    </>
  );
}

export default CreateForm;
