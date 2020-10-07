const express = require("express");
const app = express();
const server = require("http").createServer(app);
const io = require("socket.io")(server);

let adminId = "";

const PORT = process.env.POR || 4000;

io.on("connect", (socket) => {
  console.log("Client connected");
  socket.on("disconnect", () => console.log("Client Disconnected"));

  socket.on("text", (text) => {
    console.log(text);
    socket.broadcast.emit("chat-message", text);
  });
  socket.on("login", (login) => {
    if (login[0] === "rick" && login[1] === "perez") {
      adminId = socket.client.id;
      socket.emit("confirmLogin", adminId);
    }
  });
  socket.on("submitAnswer", (ans) => {
    console.log(ans);
    return io.to(adminId).emit("receiveAnswer", ans);
  });

  socket.on("surveyResults", (results) => {
    console.log(results);
    socket.broadcast.emit("results", results);
    return io.to(adminId).emit("results", results);
  });
});
server.listen(PORT, () => {
  console.log(`Listening on ${PORT}`);
});
