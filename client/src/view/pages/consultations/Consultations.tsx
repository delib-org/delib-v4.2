// get consultations
import { Link } from "react-router-dom";
import { useAppSelector } from "../../../control/hooks";
import { ConsultationProps } from "../../../model/consultationModelC";
import ConsultationCard from "./ConsultationCard";

const Consultations = () => {
  const consultations = useAppSelector(
    (state) => state.consultations.consultations
  );
  return (
    <div>
      <main>
        <Link to="/consultations/new-consultation">
          <div className="btn">הוספת התייעצות</div>
        </Link>
        <div className="wrapper">
          {consultations.map((consultation: ConsultationProps) => (
            <ConsultationCard
              key={consultation._id}
              consultation={consultation}
            />
          ))}
        </div>
      </main>
    </div>
  );
};

export default Consultations;
