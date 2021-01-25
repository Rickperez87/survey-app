import io from "socket.io-client";

//dev
// const socket = io("http://localhost:4000", {
//   transports: ["websocket", "polling"],
// });

// // deploy
const socket = io();

export default socket;
