import { io } from "socket.io-client";

const socket = io(
  process.env.REACT_APP_BACKEND_URL ||
    "https://realtime-whiteboard-l4cw.onrender.com",
  {
    transports: ["websocket"], // Force WebSocket
  }
);

export default socket;
