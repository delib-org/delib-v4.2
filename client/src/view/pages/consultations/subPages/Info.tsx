import { useParams } from "react-router-dom";
import { useAppSelector } from "../../../../control/hooks";
const Info = () => {
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
        <div className="info">{consultation.description}</div>
        </div>
      </main>
    );
  else return null;
};

export default Info;
