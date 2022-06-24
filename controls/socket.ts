import { io } from "../server";

export async function userConnect(socket: any) {
  console.log("user connected", socket.id);
  socket.on("join-consultation", (consultationId: any) => {
    if (consultationId) {
      socket.join(consultationId);
      console.log(`user ${socket.id} joined ${consultationId}`);
    }
  });
  socket.on("leave-consultation", (consultationId: any) => {
    if (consultationId) {
      socket.leave(consultationId);
      console.log(`user ${socket.id} LEFT ${consultationId}`);
    }
  });

  socket.on("consultation-message", ({ consultationId, message }) => {
    try {
      console.log("consultation-message:", message);
      io.to(consultationId).emit("consultation-message", message);
    } catch (error) {}
  });

  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
}
