import express from 'express';
import {getMonthlyIncome, getPopularDestnationsMonth, getOrdersLastMonth, getGeneralStatistic, createTask, getTodoList, deleteTask, updateTask, getMostActiveUsers} from '../controllers/statistic';
const statisticRoutes = express.Router();


statisticRoutes.get('/income/monthly', getMonthlyIncome);
statisticRoutes.get('/populardestinations/month', getPopularDestnationsMonth);
statisticRoutes.get('/orders/lastmonth', getOrdersLastMonth);
statisticRoutes.get('/general/tours-orders-followers-icome', getGeneralStatistic);
statisticRoutes.post('/todo/', createTask);
statisticRoutes.delete('/todo/:id', deleteTask);
statisticRoutes.put('/todo/:id', updateTask);
statisticRoutes.get('/todo/', getTodoList);
statisticRoutes.get('/mostactive/users', getMostActiveUsers);

export default statisticRoutes;
