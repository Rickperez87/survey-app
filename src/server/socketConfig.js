import io from "socket.io-client";

let socket;
if (process.env.NODE_ENV === "development") {
  socket = io("http://localhost:4000", {
    transports: ["websocket", "polling"],
  });
} else {
  socket = io();
}

export default socket;
