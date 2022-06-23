const express = require("express");
const app = express();
const http = require("http");
const mongoose = require('mongoose');
require('dotenv').config();
const server = http.createServer(app);
const { Server } = require("socket.io");
export const io = new Server(server);
const port = process.env.PORT || 4000;
var cors = require("cors");
app.use(express.json())

import { userConnect } from "./controls/socket";



var corsOptions = {
  origin: 'http://localhost:3000',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}



const uri = process.env.MONGODB_URI;

app.use(cors(corsOptions));

mongoose.connect(uri).then(()=>console.log('connect to DB!')).catch(err=>console.log(err.message));

app.use(express.static('client/build'))

io.on("connection", (socket: any) => {
  userConnect(socket);
});

import usersRouter from './routes/usersRoute';
app.use('/users', usersRouter);

server.listen(port, () => {
  console.log(`listening on *:${port}`);
});
