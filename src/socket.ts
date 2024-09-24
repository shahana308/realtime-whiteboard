import { io } from "socket.io-client";

const socket = io(process.env.REACT_APP_URL || "http://localhost:4001");

export default socket;
