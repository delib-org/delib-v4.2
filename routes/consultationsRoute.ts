import express from 'express';
const router = express.Router();
import { decodeUser } from '../controls/usersCont';
import { addConsultation } from "../controls/consulatationCont";

router.post('/add-consultation',decodeUser, addConsultation);

export default router;