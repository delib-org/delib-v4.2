import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { getMembershipPending } from "../../../../control/db/membershipDB";
import { MembershipPending,updatePendings } from "../../../../control/slices/membersSlice";
import { useAppDispatch } from "../../../../control/hooks";

//get group requeasts

const ConsultationAdminMembers = () => {
  const dispatch = useAppDispatch()
  const { consultationId } = useParams();

  useEffect(() => {
    if (consultationId) {
      getMembershipPending(consultationId)
        .then((pendings: any) => {
          console.log(pendings);
          dispatch(updatePendings(pendings))
        })
        .catch((err) => {
          console.error(err);
        });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [consultationId]);
  return <div>ConsultationAdminMembers</div>;
};

export default ConsultationAdminMembers;
