import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getConsultation } from "../../../control/db/consutationsDB";
import { useAppDispatch, useAppSelector } from "../../../control/hooks";
import { setConsultation } from "../../../control/slices/consultationsSlice";

import { socket } from "../../../index";
import { ConsultationProps } from "../../../model/consultationModelC";

//components
import TopNav from "../../components/TopNav";
import SubPages from "./subPages/SubPages";

export enum SubPage {
  INFO = "מידע",
  CHAT = "שיחה",
  OPTIONS = "חלופות",
  VOTES='הצבעה'
}
const subPages = [SubPage.INFO, SubPage.CHAT, SubPage.OPTIONS, SubPage.VOTES];

const Consultation = () => {
  const dispatch = useAppDispatch();
  const { consultationId } = useParams();
  const conaultation: ConsultationProps | undefined = useAppSelector((state) =>
    state.consultations.consultations.find(
      (cnsl) => cnsl._id === consultationId
    )
  );
  const [page, setPage] = useState<SubPage>(SubPage.INFO);

  useEffect(() => {
    if (consultationId)
      getConsultation(consultationId).then((consultationDB) => {
        console.log(consultationDB);
        if (consultationDB) {
          dispatch(setConsultation(consultationDB));
        }
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [consultationId]);

  if (conaultation) {
    return (
      <div>
        <h2>התייעצות: {conaultation.name}</h2>
        <TopNav elements={subPages} setSelected={setPage} selected={page} />
        <SubPages page={page} />
      </div>
    );
  } else {
    return null;
  }
};

export default Consultation;
