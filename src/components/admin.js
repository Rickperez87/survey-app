import React from "react";
import useFormState from "../custom-react-hooks/form-state-hook";
import io from "socket.io-client";

const socket = io("http://localhost:4000", {
  transports: ["websocket", "polling"],
});

function Admin(props) {
  const [user, updateUser, clearUser] = useFormState("");
  const [pass, updatePass, clearPass] = useFormState("");

  const login = () => {
    console.log(`submitted ${user}, ${pass}`);
    socket.emit("login", [user, pass]);
    clearUser();
    clearPass();
  };
  return (
    <div>
      <input type="text" value={user} onChange={updateUser}></input>
      <input type="text" value={pass} onChange={updatePass}></input>
      <button onClick={() => login()}>Login</button>
    </div>
  );
}

export default Admin;
