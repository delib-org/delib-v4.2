const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const port = process.env.PORT || 4000;
var cors = require("cors");

app.use(cors());

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

io.on("connection", (socket) => {
  let counter = 0;
  console.log("a user connected");
  console.log(socket.id)

  socket.on("hi", (msg) => {
    const { hi } = msg;
    console.log("hi", hi);
    if (hi) {
      socket.emit("hi2", { hi });
    }
  });

  socket.on('msg',({text})=>{
    console.log(text)
    io.emit('msg', {text});
  })

  const clearCounterInterval = setInterval(() => {
    socket.emit("counter", { counter });
    counter++;
    console.log(counter);
  }, 2000);

  socket.on("disconnect", () => {
    clearInterval(clearCounterInterval);
    console.log("user disconnected");
  });
});

server.listen(port, () => {
  console.log(`listening on *:${port}`);
});
