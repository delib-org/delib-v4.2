import { useParams } from "react-router-dom";

//redux
import { MembershipPending,updateMemberships } from "../../../../control/slices/membersSlice";
import { useAppDispatch } from "../../../../control/hooks";
//controls
import { setMembership } from "../../../../control/db/membershipDB";
import { Role } from "../../../../model/role";



interface PendingUserCardProps {
  pending: MembershipPending;
}

const PendingUserCard = (props: PendingUserCardProps) => {
  const dispatch = useAppDispatch();
  const { pending } = props;
  const { user } = pending;
  const { consultationId } = useParams();
  async function handleSetMembership(role: Role) {
    try {
      const { membership, status } = await setMembership(
        role,
        consultationId,
        user.sub
      );
      if(membership && status){
        console.log(membership, status)
        dispatch(updateMemberships({memberships:[membership],pending}))
      }
    } catch (error) {
      console.error(error);
    }
  }
  return (
    <div className="card pendingCard">
      <img src={user.picture} alt={user.name} />
      <div>{user.name}</div>
      <div className="pendingCard__btns">
        <div
          className="btn btn--small btn--confirm"
          onClick={() => handleSetMembership(Role.MEMBER)}>
          חבר.ה רגיל.ה
        </div>
        <div
          className="btn btn--small btn--confirm"
          onClick={() => handleSetMembership(Role.ADMIN)}>
          מנהל.ת
        </div>
        <div
          className="btn btn--small btn--danger"
          onClick={() => handleSetMembership(Role.BANNED)}>
          דחיה
        </div>
      </div>
    </div>
  );
};

export default PendingUserCard;
