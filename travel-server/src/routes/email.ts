import express from 'express';
import {sendEmail} from '../controllers/email';
const emailRoutes = express.Router();

emailRoutes.post('/', sendEmail);

export default emailRoutes;
