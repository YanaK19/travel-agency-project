import express from 'express';
import {create, getLocationById, isExist} from '../controllers/location';
import authenticateJwt from "../middleware/authenticateJwt";
import isAdmin from "../middleware/isAdmin";
const locationRoutes = express.Router();

locationRoutes.post('/', authenticateJwt, isAdmin, create);
locationRoutes.get('/:id', getLocationById);
locationRoutes.get('/', isExist);

export default locationRoutes;