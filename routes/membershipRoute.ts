import express from 'express';
import { getMembership } from '../controls/membershipCont';
const router = express.Router();
import { decodeUser } from '../controls/usersCont';

router.get('/get-membership',decodeUser ,getMembership)

export default router