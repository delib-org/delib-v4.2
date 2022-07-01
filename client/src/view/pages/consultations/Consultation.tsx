import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getConsultation } from "../../../control/db/consutationsDB";
import { useAppDispatch, useAppSelector } from "../../../control/hooks";
import { setConsultation } from "../../../control/slices/consultationsSlice";

import { ConsultationProps } from "../../../model/consultationModelC";

//components
import TopNav from "../../components/TopNav";
import SubPages from "./subPages/SubPages";

export enum SubPage {
  INTRO = "הקדמה",
  INFO = "מידע",
  CHAT = "שיחה",
  OPTIONS = "חלופות",
  VOTES = "הצבעה",
}
const subPages = [
  SubPage.INTRO,
  SubPage.INFO,
  SubPage.CHAT,
  SubPage.OPTIONS,
  SubPage.VOTES,
];

const Consultation = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { consultationId } = useParams();
  const conaultation: ConsultationProps | undefined = useAppSelector((state) =>
    state.consultations.consultations.find(
      (cnsl) => cnsl._id === consultationId
    )
  );
  const [page, setPage] = useState<SubPage>(SubPage.INTRO);

  useEffect(() => {
    if (consultationId)
      getConsultation(consultationId)
        .then(({ consultation, error, redirect }) => {
          try {
            if (error) throw error;
            if (redirect) {
              console.log(redirect)
              navigate(redirect);
            }
            console.log(consultation);
            if (consultation) {
              dispatch(setConsultation(consultation));
            }
          } catch (err) {
            console.error(err);
          }
        })
        .catch((error) => {
          console.error(error);
        });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [consultationId]);

  if (conaultation) {
    return (
      <div className="cnsl">
        <div className="cnsl__top">
          <h2>{conaultation.name}</h2>
          <TopNav elements={subPages} setSelected={setPage} selected={page} />
        </div>
        <SubPages page={page} />
      </div>
    );
  } else {
    return null;
  }
};

export default Consultation;
