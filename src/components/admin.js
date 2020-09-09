import React from "react";
import useFormState from "../custom-react-hooks/form-state-hook";
import "../styles/survey.css";

function Admin(props) {
  const [user, updateUser, clearUser] = useFormState("");
  const [pass, updatePass, clearPass] = useFormState("");

  const login = () => {
    console.log(`submitted ${user}, ${pass}`);
    props.socket.emit("login", [user, pass]);
    clearUser();
    clearPass();
  };
  return (
    <div className="login-container">
      <input type="text" value={user} onChange={updateUser}></input>
      <input type="text" value={pass} onChange={updatePass}></input>
      <button onClick={() => login()}>Login</button>
    </div>
  );
}

export default Admin;
