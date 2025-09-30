const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
  },
});

io.on("connection", (socket) => {
  console.log("A user connected");

  socket.emit("welcome", "Welcome to the Socket.io server!");

  socket.on("disconnect", () => {
    console.log("A user disconnected");
  });

  socket.on("message", (messageData) => {
    console.log("Received new message:", messageData);
    io.emit("newMessage", messageData);
  });
});

const PORT = 8900;
server.listen(PORT, () => {
  console.log(`Socket.io server is running on port ${PORT}`);
});
