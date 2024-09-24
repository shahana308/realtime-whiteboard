import { io } from "socket.io-client";

const socket = io(process.env.BACKEND_URL || "http://localhost:4000");

export default socket;
