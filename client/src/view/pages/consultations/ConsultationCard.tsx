import React from "react";
import { Link } from "react-router-dom";
import { ConsultationProps } from "../../../model/consultationModelC";
interface ConsultationCardProps {
  consultation: ConsultationProps;
}
const ConsultationCard = (props: ConsultationCardProps) => {
  const { consultation } = props;

  return (
    <div className="card">
      <Link to={`/consultations/${consultation._id}`}>
        <div className="card__title">{consultation.name}</div>
        <div className="card__description">{consultation.description}</div>
      </Link>
    </div>
  );
};

export default ConsultationCard;
