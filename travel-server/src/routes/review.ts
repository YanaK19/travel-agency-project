import express from 'express';
import {create, getReviews, remove} from '../controllers/review';
const reviewRoutes = express.Router();

reviewRoutes.post('/', create);
reviewRoutes.get('/', getReviews);
reviewRoutes.delete('/:id', remove);

export default reviewRoutes;