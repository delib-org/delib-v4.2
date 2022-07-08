import express from 'express';
import { getMembership, getPending, setMembership } from '../controls/membershipCont';
const router = express.Router();
import { decodeUser } from '../controls/usersCont';

router.get('/get-pending',decodeUser ,getPending)
.post('/set-membership',decodeUser,setMembership)

export default router