import express from 'express';
import { login,getUser,decodeUser } from '../controls/usersCont';
const router = express.Router();

router.post('/login', login)
.get('/get-user',decodeUser, getUser);

export default router;