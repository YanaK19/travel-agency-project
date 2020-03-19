import express from 'express';
import {create, remove, getRangeById, getRanges, update, getAllLangRanges} from '../controllers/range';
import authenticateJwt from "../middleware/authenticateJwt";
import isAdmin from "../middleware/isAdmin";
const rangeRoutes = express.Router();

rangeRoutes.post('/',/* authenticateJwt, isAdmin,*/ create);
rangeRoutes.put('/', authenticateJwt, isAdmin, update);
rangeRoutes.get('/:id', getRangeById);
rangeRoutes.get('/', getRanges);
rangeRoutes.get('/allLangs/ranges', getAllLangRanges);
rangeRoutes.delete('/:id', authenticateJwt, isAdmin, remove);

export default rangeRoutes;

