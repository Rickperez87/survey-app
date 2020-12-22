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
    return id === adminId;
  };

  socket.on("sentQuestion", function ({ data, surveyTyp }) {
    console.log(surveyTyp);
    socket.broadcast.emit("surveyQuestion", { data, surveyTyp });
  });

  socket.on("login", function (input) {
    if (isAdmin(input)) {
      setAdminId(socket.client.id);
      io.to(adminId).emit("confirmLogin", adminId);
    }
  });

  const isAdmin = (input) => {
    return input.userName === "rick" && input.password === "perez";
  };

  const setAdminId = (id) => {
    adminId = id;
    return console.log(adminId);
  };

  socket.on("newUser", function (userName) {
    console.log(isUniqueUser(userList, userName), userList);
    if (isUniqueUser(userList, userName)) {
      let user = addUser(userName);
      io.to(user.id).emit("uniqueUserName");
    } else {
      io.to(socket.client.id).emit("duplicateUserName");
    }
  });

  function isUniqueUser(userList, userName) {
    return !userList.has(userName);
  }
  function addUser(userName) {
    let user = { userName, id: socket.client.id };
    userList.add(user.userName);
    return user;
  }

  socket.on("submitAnswer", function (ans) {
    console.log("ans", ans);
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
