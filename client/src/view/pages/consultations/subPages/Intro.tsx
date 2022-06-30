// import {useEffect} from 'react';
import { useParams } from "react-router-dom";
import { useAppSelector } from "../../../../control/hooks";

//components
import Editor from "../../../components/Editor";





const Intro = () => {
  const { consultationId } = useParams();
  const consultation = useAppSelector((state) =>
    state.consultations.consultations.find(
      (cnsl) => cnsl._id === consultationId
    )
  );
  if (consultation)
    return (
      <main>
        <div className="wrapper">
          <Editor />
          <div className="intro">{consultation.description}</div>
        </div>
      </main>
    );
  else return null;
};

export default Intro;
