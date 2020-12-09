const express = require("express");
const app = express();
const server = require("http").createServer(app);
const io = (module.exports.io = require("socket.io")(server));
require("dotenv").config();

let adminId = "";
let userList = new Set();

const PORT = process.env.PORT || 4000;

app.use(express.static(__dirname + "/../../build"));

io.on("connect", function (socket) {
  console.log("Client connected");

  socket.on("disconnect", function () {
    if (isAdminId(socket.client.id)) {
      userList.clear();
      console.log("Admin Disconnected");
    }
    console.log("Client Disconnected");
  });

  const isAdminId = (id) => {
    if (id === adminId) {
      return true;
    }
    false;
  };

  socket.on("sentQuestion", function (text) {
    socket.broadcast.emit("surveyQuestion", text);
  });

  socket.on("sentTitle", function (title) {
    socket.broadcast.emit("surveyTitle", title);
  });

  socket.on("login", function (input) {
    if (isAdmin(input)) {
      setAdminId(socket.client.id);
      io.to(adminId).emit("confirmLogin", adminId);
    }
  });

  const isAdmin = (input) => {
    if (input.userName === "rick" && input.password === "perez") {
      return true;
    } else return false;
  };

  const setAdminId = (id) => {
    adminId = id;
    return console.log(adminId);
  };

  socket.on("newUser", function (userName) {
    let user = createUser(userName);
    if (isUniqueUser(userList, user)) {
      userList.add(user.userName);
      io.to(user.id).emit("uniqueUserName");
    } else {
      io.to(user.id).emit("duplicateUserName");
    }
  });

  function createUser(userName) {
    let newUser = { userName, id: socket.client.id };
    return newUser;
  }
  function isUniqueUser(userList, user) {
    if (userList.has(user.userName)) {
      return false;
    } else return true;
  }

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
