import express from 'express';
import {create, getLocationById, isExist} from '../controllers/location';
const locationRoutes = express.Router();

locationRoutes.post('/', create);
locationRoutes.get('/:id', getLocationById);
locationRoutes.get('/', isExist);

export default locationRoutes;