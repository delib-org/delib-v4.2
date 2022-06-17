"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.io = void 0;
const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
exports.io = new Server(server);
const port = process.env.PORT || 4000;
var cors = require("cors");
const socket_1 = require("./controls/socket");
// var corsOptions = {
//   origin: 'http://localhost:3000',
//   optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
// }
app.use(cors());
app.use(express.static('client/build'));
exports.io.on("connection", (socket) => {
    (0, socket_1.userConnect)(socket);
});
server.listen(port, () => {
    console.log(`listening on *:${port}`);
});
//# sourceMappingURL=server.js.map