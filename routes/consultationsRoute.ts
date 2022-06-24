import express from 'express';
const router = express.Router();
import { addConsultation } from "../controls/consulatationCont";

router.post('/add-consultation', addConsultation);

export default router;