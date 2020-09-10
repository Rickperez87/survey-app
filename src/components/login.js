import React from "react";
import useFormState from "../custom-react-hooks/form-state-hook";
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
      <props.TextField
        variant="outlined"
        label="User"
        value={user}
        onChange={updateUser}
      ></props.TextField>
      <props.TextField
        variant="outlined"
        label="Password"
        value={pass}
        onChange={updatePass}
      ></props.TextField>
      <props.Button variant="contained" color="primary" onClick={() => login()}>
        Login
      </props.Button>
    </div>
  );
}

export default Login;
