import express from 'express';
import {createUserMessage, sendEmail, createNewsletter, updateNewsletter} from '../controllers/email';
import userRoutes from './user';
const emailRoutes = express.Router();

emailRoutes.post('/', sendEmail);
emailRoutes.post('/collection/newsletter', createNewsletter);
emailRoutes.put('/collection/newsletter', updateNewsletter);
emailRoutes.post('/contactus/message', createUserMessage);

export default emailRoutes;
