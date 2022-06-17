import { io } from "../server";

export async function userConnect(socket: any) {
  console.log("a user connected");
  console.log(socket.id);
  socket.on("join-room", (roomId: any) => {
    console.log("join room ", roomId);
   
    if (roomId) {
      socket.join(roomId);
      console.log(socket.rooms);
    }
  });
  socket.on("leave-room", (roomId: any) => {
    console.log("leave room ", roomId);
    if (roomId) {
      socket.leave(roomId);
    }
  });

  socket.on("talk-to-room", ({ roomId, text }) => {
    try {
      console.log(roomId, text);
      console.log(roomId, "room-talk", text)
      io.to(roomId).emit("room-talk", text);
    } catch (error) {}
  });

  socket.on("msg", ({ text }) => {
    console.log(text);
    io.emit("msg", { text });
  });

  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
}
