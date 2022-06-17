import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { socket } from "../../index";

interface Text {
  text: string;
  roomId: string;
  date: Date;
}
let textsTemp: Array<Text> = [];

const Room = () => {
  console.log("------- RENDER $$$$$$$$ ----");
  const [texts, setTexts] = useState<Array<Text>>([]);

  const { roomId } = useParams();

  useEffect(() => {
    console.log("----- entering room -------");
    if (roomId) {
      socket.emit("join-room", roomId);
    }

    socket.on("room-talk", (text) => {
      console.log("room-talk", text);
      if (text && roomId) {
        console.log("texts:", texts);
        textsTemp.push({ text, roomId, date: new Date() });

        console.log(textsTemp);
        setTexts(textsTemp);
      }
    });

    return () => {
      console.log("----- EXITING room -------");
      socket.emit("leave-room", roomId);
      socket.off("room-talk");
    };

    // eslint-disable-next-line
  }, [roomId]);

  function handleSubmit(ev: any) {
    try {
      ev.preventDefault();
      const text = ev.target.text.value;

      socket.emit("talk-to-room", { text, roomId });
    } catch (error) {
      console.error(error);
    } finally {
      //   ev.target.reset();
    }
  }
  console.log(texts);
  return (
    <div>
      <h2>Room: {roomId}</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="text" placeholder="enter text" />
        <input type="submit" value="Send" />
      </form>
      <ul>
        {textsTemp.map((text, index) => {
          return <li key={index}>{text.text}</li>;
        })}
      </ul>
    </div>
  );
};

Room.propTypes = {};

export default Room;
