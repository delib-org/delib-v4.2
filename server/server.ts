const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
export const io = new Server(server);
const port = process.env.PORT || 4000;
var cors = require("cors");

import { userConnect } from "./Controls/socket";

import Decision from 'models/m/decisionModel'

var corsOptions = {
  origin: 'http://localhost:3000',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}



app.use(cors(corsOptions));

app.use(express.static('client/build'))

io.on("connection", (socket: any) => {
  userConnect(socket);
});

server.listen(port, () => {
  console.log(`listening on *:${port}`);
});
