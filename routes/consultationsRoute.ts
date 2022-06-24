import express from 'express';
const router = express.Router();
import { decodeUser } from '../controls/usersCont';
import { addConsultation, getUserConsultations,getConsultation } from "../controls/consulatationCont";

router.post('/add-consultation',decodeUser, addConsultation)
.get('/get-user-consultations',decodeUser, getUserConsultations)
.get('/get-consultation', getConsultation)

export default router;