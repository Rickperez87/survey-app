import React from "react";
import useFormState from "../custom-react-hooks/form-state-hook";
import Input from "@material-ui/core/Input";
import Button from "@material-ui/core/Button";
import "../styles/survey.css";

function Login(props) {
  const [user, updateUser, clearUser] = useFormState("");
  const [pass, updatePass, clearPass] = useFormState("");

  const login = () => {
    console.log(`submitted ${user}, ${pass}`);
    props.socket.emit("login", [user, pass]);
    clearUser();
    clearPass();
  };
  return (
    <div
      className={
        props.loggedin || props.questionDisplayed ? "hidden" : "login-container"
      }
    >
      <h1 className={props.loggedin ? "hidden" : ""}>Host Login</h1>
      <Input placeholder="User" value={user} onChange={updateUser} />
      <Input placeholder="Password" value={pass} onChange={updatePass} />
      <Button variant="contained" color="primary" onClick={() => login()}>
        Login
      </Button>
    </div>
  );
}

export default Login;
