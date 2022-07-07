import express from 'express';
import { getMembership, getPending } from '../controls/membershipCont';
const router = express.Router();
import { decodeUser } from '../controls/usersCont';

router.get('/get-pending',decodeUser ,getPending)

export default router