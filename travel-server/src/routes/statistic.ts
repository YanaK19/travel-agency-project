import express from 'express';
import {getMonthlyIncome, getPopularDestnationsMonth, getOrdersLastMonth, getGeneralStatistic} from '../controllers/statistic';
const statisticRoutes = express.Router();


statisticRoutes.get('/income/monthly', getMonthlyIncome);
statisticRoutes.get('/populardestinations/month', getPopularDestnationsMonth);
statisticRoutes.get('/orders/lastmonth', getOrdersLastMonth);
statisticRoutes.get('/general/tours-orders-followers', getGeneralStatistic);

export default statisticRoutes;
