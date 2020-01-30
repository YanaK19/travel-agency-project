import express from 'express';
import {create, remove, update, getTourById, getFilSortTours} from '../controllers/tour';
const tourRoutes = express.Router();

tourRoutes.post('/', create);
tourRoutes.delete('/:id', remove);
tourRoutes.put('/:id', update);
tourRoutes.get('/:id', getTourById);
tourRoutes.get('/', getFilSortTours);

export default tourRoutes;