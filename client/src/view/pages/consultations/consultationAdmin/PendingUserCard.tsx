import { useParams } from 'react-router-dom';
import { MembershipPending } from '../../../../control/slices/membersSlice';

//controls
import {setMembership} from '../../../../control/db/membershipDB'
import { Role } from '../../../../model/role';

interface PendingUserCardProps{
  pending:MembershipPending
}

const PendingUserCard = (props:PendingUserCardProps) => {
  const {pending} = props;
  const {user} = pending;
  const {consultationId} = useParams()
  console.log(consultationId)
  return (
    <div className='card pendingCard'>
      <img src={user.picture} alt={user.name} />
      <div>{user.name}</div>
      <div className="pendingCard__btns">
        <div className="btn btn--small btn--confirm" onClick={()=>setMembership(Role.MEMBER,consultationId, user.sub)}>חבר.ה רגיל.ה</div>
        <div className="btn btn--small btn--confirm" onClick={()=>setMembership(Role.ADMIN,consultationId, user.sub)}>מנהל.ת</div>
        <div className="btn btn--small btn--danger" onClick={()=>setMembership(Role.BANNED,consultationId ,user.sub)}>דחיה</div>
      </div>
    </div> 
  )
}

export default PendingUserCard