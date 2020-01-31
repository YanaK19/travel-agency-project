import express from 'express';
import {create, remove, getRangeById, getRanges} from '../controllers/range';
const rangeRoutes = express.Router();

rangeRoutes.post('/', create);
rangeRoutes.get('/:id', getRangeById);
rangeRoutes.get('/', getRanges);
rangeRoutes.delete('/:id', remove);

export default rangeRoutes;

