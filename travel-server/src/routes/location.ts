import express from 'express';
import {create, getLocationById, getLocations/*, isExist*/, getAllLangsLocations, updateLocationById, deleteLocationById} from '../controllers/location';
import authenticateJwt from "../middleware/authenticateJwt";
import isAdmin from "../middleware/isAdmin";
const locationRoutes = express.Router();

locationRoutes.post('/', /*authenticateJwt, isAdmin,*/ create);
locationRoutes.get('/:id', getLocationById);
locationRoutes.get('/', getLocations);
locationRoutes.get('/allLangs/locations', getAllLangsLocations);
locationRoutes.put('/:id', updateLocationById);
locationRoutes.delete('/:id', deleteLocationById);

export default locationRoutes;
