import { Outlet,useParams } from "react-router-dom";
import { useAppSelector } from "../../../../control/hooks";
import { ConsultationProps } from "../../../../model/consultationModelC";
//components
import ConsultationAdminTabs from "./ConsultationAdminTabs";

const ConsultationAdmin = () => {
  const {consultationId} = useParams();
  const consultation:ConsultationProps|undefined = useAppSelector(state=>state.consultations.consultations.find(cnsl=>cnsl._id === consultationId))

  return (
    <div>
      <h1>ניהול הקבוצה: {consultation?consultation.name:null}</h1>
      
      <ConsultationAdminTabs />
      <Outlet />
    </div>
  );
};

export default ConsultationAdmin;
