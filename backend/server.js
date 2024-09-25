require("dotenv").config();

const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
// const path = require("path");

const app = express();
const server = http.createServer(app);

// // Serve static files from the React app
// app.use(express.static(path.join(__dirname, "frontend/build")));

// // The "index.html" file serves the React app
// app.get("*", (req, res) => {
//   res.sendFile(path.join(__dirname, "frontend/build", "index.html"));
// });

app.use(
  cors({
    origin: [
      process.env.CLIENT_URL,
      "https://realtime-whiteboard-l4cw.onrender.com",
    ],
    methods: ["GET", "POST"],
    credentials: true,
  })
);

const io = new Server(server, {
  cors: {
    origin: process.env.CLIENT_URL,
    methods: ["GET", "POST"],
    credentials: true,
  },
});

io.on("connection", (socket) => {
  console.log("a user connected");
  socket.on("draw", (data) => {
    socket.broadcast.emit("draw", data);
  });
});

server.listen(4000, () => {
  console.log("listening");
});
