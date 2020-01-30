import express from 'express';
import {create, getOrders, remove} from '../controllers/order';
const orderRoutes = express.Router();

orderRoutes.post('/', create);
orderRoutes.get('/', getOrders);
orderRoutes.delete('/:id', remove);

export default orderRoutes;
