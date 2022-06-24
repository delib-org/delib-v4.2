import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { socket } from "../../../index";


interface Text {
  text: string;
  decisionId: string;
  date: Date;
}
let textsTemp: Array<Text> = [];

const Consultation = () => {

  const [texts, setTexts] = useState<Array<Text>>([]);
  const [up, setUp] = useState<number>(2);

  const { decisionId } = useParams();

  useEffect(() => {
    if (decisionId) {
      socket.emit("join-decision", decisionId);
    }

    socket.on("decision-talk", (text) => {
      if (text && decisionId) {
        textsTemp.push({ text, decisionId, date: new Date() });
        setTexts(textsTemp);
        setUp(Math.random());
      }
    });

    return () => {
      socket.emit("leave-decision", decisionId);
      socket.off("decision-talk");
    };

    // eslint-disable-next-line
  }, [decisionId]);

  useEffect(() => {
   
  }, [up]);

  function handleSubmit(ev: any) {
    try {
      ev.preventDefault();
      const text = ev.target.text.value;

      socket.emit("talk-to-decision", { text, decisionId });
    } catch (error) {
      console.error(error);
    } finally {
      //   ev.target.reset();
    }
  }

  return (
    <div>
      <h2>Room: {decisionId}</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="text" placeholder="enter text" />
        <input type="submit" value="Send" />
      </form>
      <ul>
        {texts.filter(text=>text.decisionId === decisionId).map((text, index) => {
          return <li key={index}>{text.text}</li>;
        })}
      </ul>
    </div>
  );
};



export default Consultation;
