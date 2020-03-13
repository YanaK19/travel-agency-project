import express from 'express';
import {create, remove, getRangeById, getRanges, update} from '../controllers/range';
import authenticateJwt from "../middleware/authenticateJwt";
import isAdmin from "../middleware/isAdmin";
const rangeRoutes = express.Router();

rangeRoutes.post('/', authenticateJwt, isAdmin, create);
rangeRoutes.put('/:id', authenticateJwt, isAdmin, update);
rangeRoutes.get('/:id', getRangeById);
rangeRoutes.get('/', getRanges);
rangeRoutes.delete('/:id', authenticateJwt, isAdmin, remove);

export default rangeRoutes;

