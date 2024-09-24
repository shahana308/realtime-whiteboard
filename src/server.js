const express = require("express"); // A web framework used for setting up the server.
const http = require("http"); // Built-in Node.js module to create an HTTP server, which Socket.IO needs for communication.
const { Server } = require("socket.io"); // A library that provides WebSocket functionality, enabling real-time, bi-directional communication between clients and servers.

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: process.env.CORS_ORIGIN,
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type"],
    credentials: true,
  },
});

io.on("connection", (socket) => {
  console.log("a user connected");
  socket.on("draw", (data) => {
    console.log("drawing");
    socket.broadcast.emit("draw", data);
  });
});

server.listen(4000, () => {
  console.log("listening on *:4000");
});
