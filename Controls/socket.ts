import {io} from '../server';

export function userConnect(socket:any){
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
  };