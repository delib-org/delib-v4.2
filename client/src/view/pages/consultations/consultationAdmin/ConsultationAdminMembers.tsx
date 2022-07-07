import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { getMembershipPending } from "../../../../control/db/membershipDB";
import { MembershipPending,updatePendings } from "../../../../control/slices/membersSlice";
import { useAppDispatch, useAppSelector } from "../../../../control/hooks";

//components
import PendingUserCard from "./PendingUserCard";
import { userInfo } from "os";

const ConsultationAdminMembers = () => {
  const dispatch = useAppDispatch()
  const { consultationId } = useParams();
  const pendings = useAppSelector(state=>state.members.pendings)

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
  return <div>
    {pendings.map(pending=>{
      return <PendingUserCard key={pending.id} pending={pending} />
    })}
  </div>;
};

export default ConsultationAdminMembers;
