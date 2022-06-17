import { io } from "../server";

export async function userConnect(socket: any) {
  socket.on("join-room", (roomId: any) => {
    if (roomId) {
      socket.join(roomId);
    }
  });
  socket.on("leave-room", (roomId: any) => {
    if (roomId) {
      socket.leave(roomId);
    }
  });

  socket.on("talk-to-room", ({ roomId, text }) => {
    try {
      io.to(roomId).emit("room-talk", text);
    } catch (error) {}
  });

  socket.on("msg", ({ text }) => {
    io.emit("msg", { text });
  });

  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
}
