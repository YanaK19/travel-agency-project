import express from 'express';
import {create, getOrders, getOrderById, remove, update, getFullInfoByOrderId} from '../controllers/order';
const orderRoutes = express.Router();
import passport from "passport";
import authenticateJwt from "../middleware/authenticateJwt";
import isAdmin from "../middleware/isAdmin";



orderRoutes.post('/', create);
orderRoutes.get('/', getOrders);
orderRoutes.get('/:id', getOrderById);
orderRoutes.get('/fullInfo/:id', getFullInfoByOrderId);
orderRoutes.delete('/:id', authenticateJwt, isAdmin, remove);
orderRoutes.put('/:id', authenticateJwt, isAdmin, update);

export default orderRoutes;


