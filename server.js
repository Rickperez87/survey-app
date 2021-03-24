const express = require("express");
const path = require("path");
const app = express();
require("dotenv").config();

app.use(helmet());

let io;
const PORT = process.env.PORT || 4000;

if (process.env.NODE_ENV === "development") {
  const server = require("http").createServer(app);
  server.listen(PORT, function () {
    console.log(`Listening on ${PORT}`);
    io = module.exports.io = require("socket.io")(server);
  });
}
// setup https for deployment on server
else {
  var fs = require("fs");
  var path_root = "/etc/letsencrypt/live/apps.rickperez.dev/";
  var options = {
    cert: fs.readFileSync(`${path_root}cert.pem`),
    key: fs.readFileSync(`${path_root}privkey.pem`),
  };
  var https = require("https").createServer(options, app);
  https.listen(PORT, () => {
    console.log(`https- listening on ${PORT}`);
  });
  io = module.exports.io = require("socket.io").listen(https);
}

let adminId = "";
let userList = new Set();

app.use(express.static(path.join(__dirname, "build")));
app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

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

  socket.on("sentQuestion", function (data) {
    socket.broadcast.emit("surveyQuestion", data);
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
    if (isUniqueUser(userList, userName)) {
      let user = addUser(userName);
      io.to(user.id).emit("uniqueUserName");
    } else {
      io.to(socket.client.id).emit("duplicateUserName");
    }
  });

  function isUniqueUser(userList, userName) {
    userName = userName.slice().toLowerCase();
    return !userList.has(userName);
  }
  function addUser(userName) {
    userName = userName.slice().toLowerCase();
    let user = { userName, id: socket.client.id };
    userList.add(user.userName);
    return user;
  }

  socket.on("submitAnswer", function (data) {
    io.to(adminId).emit("receiveAnswer", data);
  });

  socket.on("surveyResults", function (results) {
    socket.broadcast.emit("results", results);
    io.to(adminId).emit("results", results);
  });

  socket.on("cancelSurveyResults", function () {
    socket.broadcast.emit("cancelSurveyResults");
  });
});
