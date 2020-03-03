import express from 'express';
import {create, getUserById, login, register} from '../controllers/user';
import authenticateJwt from "../middleware/authenticateJwt";
import isAdmin from "../middleware/isAdmin";
const userRoutes = express.Router();

userRoutes.post('/', authenticateJwt, isAdmin, create);
userRoutes.get('/:id', getUserById);
userRoutes.post('/login', login);
userRoutes.post('/register', register);

export default userRoutes;
