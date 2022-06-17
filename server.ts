const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
export const io = new Server(server);
const port = process.env.PORT || 4000;
var cors = require("cors");

import { userConnect } from "./Controls/socket";

app.use(cors());

// app.get("/", (req, res) => {
//   res.sendFile(__dirname + "/index.html");
// });

io.on("connection", (socket: any) => {
  userConnect(socket);
});

server.listen(port, () => {
  console.log(`listening on *:${port}`);
});
