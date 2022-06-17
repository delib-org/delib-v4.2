import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";

import { socket } from "../../index";

interface Text {
  text: string;
  roomId: string;
  date: Date;
}
let textsTemp: Array<Text> = [];

const Room = () => {
  const [texts, setTexts] = useState<Array<Text>>([]);
  const [up, setUp] = useState<number>(2);

  const { roomId } = useParams();

  useEffect(() => {
    if (roomId) {
      socket.emit("join-room", roomId);
    }

    socket.on("room-talk", (text) => {
      if (text && roomId) {
        textsTemp.push({ text, roomId, date: new Date() });
        setTexts(textsTemp);
        setUp(Math.random());
      }
    });

    return () => {
      socket.emit("leave-room", roomId);
      socket.off("room-talk");
    };

    // eslint-disable-next-line
  }, [roomId]);

  useEffect(() => {
    console.log(up);
  }, [up]);

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

  return (
    <div>
      <h2>Room: {roomId}</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="text" placeholder="enter text" />
        <input type="submit" value="Send" />
      </form>
      <ul>
        {texts.filter(text=>text.roomId === roomId).map((text, index) => {
          return <li key={index}>{text.text}</li>;
        })}
      </ul>
    </div>
  );
};

Room.propTypes = {};

export default Room;
