import express from 'express';
import {create, getReviews, remove, getReviewById, update} from '../controllers/review';
import authenticateJwt from "../middleware/authenticateJwt";
import isAdmin from "../middleware/isAdmin";
const reviewRoutes = express.Router();

reviewRoutes.post('/', create);
reviewRoutes.get('/', getReviews);
reviewRoutes.get('/:id', getReviewById);
reviewRoutes.put('/:id', authenticateJwt, isAdmin, update);
reviewRoutes.delete('/:id', remove);

export default reviewRoutes;