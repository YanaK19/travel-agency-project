import express from 'express';
import {create, login, register} from '../controllers/user';
const userRoutes = express.Router();

userRoutes.post('/', create);
userRoutes.post('/login', login);
userRoutes.post('/register', register);

export default userRoutes;