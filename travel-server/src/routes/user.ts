import express from 'express';
import {create, getUserById, login, register, update} from '../controllers/user';
import authenticateJwt from "../middleware/authenticateJwt";
import isAdmin from "../middleware/isAdmin";
import {upload} from "../middleware/upload"
const userRoutes = express.Router();

userRoutes.post('/', authenticateJwt, isAdmin, create);
userRoutes.get('/:id', getUserById);
userRoutes.post('/login', login);
userRoutes.post('/register', register);
userRoutes.put('/', authenticateJwt, upload.single('image'), update);

export default userRoutes;
