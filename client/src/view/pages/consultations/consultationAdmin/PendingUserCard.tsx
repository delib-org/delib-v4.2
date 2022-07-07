import React from 'react'
import { MembershipPending } from '../../../../control/slices/membersSlice'

interface PendingUserCardProps{
  pending:MembershipPending
}

const PendingUserCard = (props:PendingUserCardProps) => {
  const {pending} = props;
  const {user} = pending;
  return (
    <div className='card pendingCard'>
      <img src={user.picture} alt={user.name} />
      <div>{user.name}</div>
      <div className="pendingCard__btns">
        <div className="btn btn--small btn--confirm">אישור</div>
        <div className="btn btn--small btn--danger">דחיה</div>
      </div>
    </div>
  )
}

export default PendingUserCard