import express from 'express';
import {create, remove, update, getTourById, getFilSortTours} from '../controllers/tour';
import authenticateJwt from "../middleware/authenticateJwt";
import isAdmin from "../middleware/isAdmin";
const tourRoutes = express.Router();

tourRoutes.post('/', authenticateJwt, isAdmin, create);
tourRoutes.delete('/:id', authenticateJwt, isAdmin, remove);
tourRoutes.put('/:id', authenticateJwt, isAdmin, update);
tourRoutes.get('/:id', getTourById);
tourRoutes.get('/', getFilSortTours);

export default tourRoutes;