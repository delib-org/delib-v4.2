import express from 'express';
import { login } from '../controls/usersCont';
const router = express.Router();

router.post('/login', login);

export default router;