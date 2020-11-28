const express = require("express");
const app = express();
const server = require("http").createServer(app);
const io = require("socket.io")(server);

let adminId = "";

const PORT = process.env.POR || 4000;

io.on("connect", function (socket) {
  console.log("Client connected");
  socket.on("disconnect", function () {
    console.log("Client Disconnected");
  });

  socket.on("sentQuestion", function (text) {
    console.log(text);
    socket.broadcast.emit("surveyQuestion", text);
  });
  socket.on("sentTitle", function (title) {
    console.log(title);
    socket.broadcast.emit("surveyTitle", title);
  });
  socket.on("login", function (login) {
    if (login[0] === "rick" && login[1] === "perez") {
      adminId = socket.client.id;
      return io.to(adminId).emit("confirmLogin", adminId);
    }
  });
  socket.on("submitAnswer", function (ans) {
    return io.to(adminId).emit("receiveAnswer", ans);
  });

  socket.on("surveyResults", function (results) {
    socket.broadcast.emit("results", results);
    return io.to(adminId).emit("results", results);
  });
});
server.listen(PORT, function () {
  console.log(`Listening on ${PORT}`);
});
