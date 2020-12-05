const path = require("path");
const express = require("express");
const app = express();
const server = require("http").createServer(app);
const io = (module.exports.io = require("socket.io")(server));

let adminId = "";
let userList = new Set();

const PORT = process.env.PORT || 4000;

app.use(express.static(__dirname + "/node_modules"));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

io.on("connect", function (socket) {
  console.log("Client connected");

  socket.on("disconnect", function () {
    console.log("Client Disconnected");
  });

  socket.on("sentQuestion", function (text) {
    socket.broadcast.emit("surveyQuestion", text);
  });

  socket.on("sentTitle", function (title) {
    socket.broadcast.emit("surveyTitle", title);
  });

  socket.on("login", function (login) {
    if (login[0] === "rick" && login[1] === "perez") {
      adminId = socket.client.id;
      io.to(adminId).emit("confirmLogin", adminId);
    }
  });

  socket.on("newUser", function (userName) {
    let newUser = { userName, id: socket.client.id };
    if (!userList.has(newUser.userName)) {
      userList.add(newUser.userName);
      io.to(newUser.id).emit("uniqueUserName");
    } else {
      io.to(newUser.id).emit("duplicateUserName");
    }
  });

  socket.on("submitAnswer", function (ans) {
    io.to(adminId).emit("receiveAnswer", ans);
  });

  socket.on("surveyResults", function (results) {
    socket.broadcast.emit("results", results);
    io.to(adminId).emit("results", results);
  });

  socket.on("cancelSurveyResults", function () {
    socket.broadcast.emit("cancelSurveyResults");
  });
});

server.listen(PORT, function () {
  console.log(`Listening on ${PORT}`);
});
