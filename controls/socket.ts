import { io } from "../server";

export async function userConnect(socket: any) {
  console.log('user connected', socket.id)
  socket.on("join-decision", (decisionId: any) => {
    if (decisionId) {
      socket.join(decisionId);
    }
  });
  socket.on("leave-decision", (decisionId: any) => {
    if (decisionId) {
      socket.leave(decisionId);
    }
  });

  socket.on("talk-to-decision", ({ decisionId, text }) => {
    try {
      io.to(decisionId).emit("decision-talk", text);
    } catch (error) {}
  });



  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
}
