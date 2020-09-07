const express = require("express");
const app = express();
const server = require("http").createServer(app);
const io = require("socket.io")(server);

const PORT = process.env.POR || 4000;

io.on("connect", (socket) => {
  console.log("Client connected");
  socket.on("disconnect", () => console.log("Client Disconnected"));

  socket.on("text", (message) => {
    console.log(message);
    socket.broadcast.emit("chat-message", message);
  });
});
server.listen(PORT, () => {
  console.log(`Listening on ${PORT}`);
});
