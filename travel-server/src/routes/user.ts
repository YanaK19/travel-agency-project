import express from 'express';
import {create} from '../controllers/user';
const userRoutes = express.Router();

userRoutes.post('/', create);

export default userRoutes;