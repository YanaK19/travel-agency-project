import express from 'express';
import {createUserMessage, sendEmail} from '../controllers/email';
import userRoutes from './user';
const emailRoutes = express.Router();

emailRoutes.post('/', sendEmail);
userRoutes.post('/send/message', createUserMessage);

export default emailRoutes;
