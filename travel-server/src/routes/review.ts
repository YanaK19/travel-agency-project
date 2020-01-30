import express from 'express';
import {create, getAll} from '../controllers/review';
const reviewRoutes = express.Router();

reviewRoutes.post('/', create);
reviewRoutes.get('/', getAll);

export default reviewRoutes;