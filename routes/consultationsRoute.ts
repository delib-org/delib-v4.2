import express from 'express';
const router = express.Router();
import { decodeUser } from '../controls/usersCont';
import { addConsultation, getUserConsultations } from "../controls/consulatationCont";

router.post('/add-consultation',decodeUser, addConsultation)
.get('/get-user-consultations',decodeUser, getUserConsultations);

export default router;