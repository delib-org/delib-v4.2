import express from 'express';
const router = express.Router();
import { decodeUser } from '../controls/usersCont';
import { addConsultation, getUserConsultations,getConsultation,addText,getText } from "../controls/consulatationCont";

router.post('/add-consultation',decodeUser, addConsultation)
.get('/get-user-consultations',decodeUser, getUserConsultations)
.get('/get-consultation', decodeUser, getConsultation)
.post('/add-text',addText)
.get('/get-text', getText)

export default router;