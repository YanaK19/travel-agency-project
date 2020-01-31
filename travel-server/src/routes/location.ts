import express from 'express';
import {create, getLocationById} from '../controllers/location';
const locationRoutes = express.Router();

locationRoutes.post('/', create);
locationRoutes.get('/:id', getLocationById)

export default locationRoutes;