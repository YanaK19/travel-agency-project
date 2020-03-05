import express from 'express';
import {create, getOrders, remove} from '../controllers/order';
const orderRoutes = express.Router();
import passport from "passport";
import authenticateJwt from "../middleware/authenticateJwt";
import isAdmin from "../middleware/isAdmin";



orderRoutes.post('/', create);
orderRoutes.get('/', getOrders);
orderRoutes.delete('/:id', authenticateJwt, isAdmin, remove);

export default orderRoutes;


