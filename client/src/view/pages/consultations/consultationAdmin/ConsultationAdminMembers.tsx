import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { getMembershipPending } from "../../../../control/db/membershipDB";
import { MembershipPending } from "../../../../control/slices/membershipSlice";

//get group requeasts

const ConsultationAdminMembers = () => {
  const { consultationId } = useParams();

  useEffect(() => {
    if (consultationId) {
      getMembershipPending(consultationId)
        .then((pendings: any) => {
          console.log(pendings);
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }, [consultationId]);
  return <div>ConsultationAdminMembers</div>;
};

export default ConsultationAdminMembers;
