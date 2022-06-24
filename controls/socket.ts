import { io } from "../server";
import MessageModel from "../model/messagesModel";
import jwt from "jwt-simple";
const Cryptr = require("cryptr");
const cryptSecret = process.env.CRYPT;
const cryptr = new Cryptr(cryptSecret);

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

  socket.on("consultation-message", async ({ consultationId, message }) => {
    try {
      // console.log("consultation-message:", socket.handshake.headers.cookie);
      
     
      
      const user = getUser();
    
      if (user) {
       
        const newMessage = new MessageModel({
          message,
          created_at: new Date(),
          consultationId,
          creator: user,
        });
        const messageDB = await newMessage.save();
     
        io.to(consultationId).emit("consultation-message", {message:messageDB});
      }
    } catch (error) {
      console.error(error)
    }
  });

  function getUser() {
    const cookies = socket.handshake.headers.cookie;
    const cookiesArray = cookies.split("; ");
    const userReg = new RegExp("user=");

    const user = cookiesArray
      .map((cookie:any) => {
        if (userReg.test(cookie)) {
          return cookie.replace("user=", "");
        }
      })
      .filter((item) => item)[0];

    const show = cryptr.decrypt(user);

    const secret = process.env.JWT_SECRET;
    const userDecoded = jwt.decode(show, secret);
    return userDecoded;
  }

  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
}
