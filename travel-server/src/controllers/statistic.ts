import errorHandler from '../utils/errorHandler';
import Review from '../models/Review';
import User from '../models/User';
import Order from '../models/Order';
import Tour from '../models/Tour';

async function getMonthlyIncome(req:any, res:any) {
    const today = new Date();

    const currDate = {
        day: today.getDate(),
        month: today.getMonth() + 1,
        year: today.getFullYear()
    };

    const incomes: any = [
        {month: 'MAY', income: 5680},
        {month: 'JUN', income: 5500},
        {month: 'JUL', income: 6700},
        {month: 'AUG', income: 6800},
        {month: 'SEP', income: 6550},
        {month: 'OCT', income: 8000},
        {month: 'NOV', income: 7890},
        {month: 'DEC', income: 8080},
        {month: 'JAN', income: 9000},
        {month: 'FEB', income: 7800},
        {month: 'MAR', income: 10000},
    ];

    try {
        res.status(200).json(incomes)
    } catch (e) {
        errorHandler(res, e)
    }
}

async function getPopularDestnationsMonth(req:any, res:any) {
    const today = new Date();

    const currDate = {
        day: today.getDate(),
        month: today.getMonth() + 1,
        year: today.getFullYear()
    };

    const ordersByCountries: any = [
        {country: 'USA', orders: 330},
        {country: 'Chana', orders: 300},
        {country: 'Japan', orders: 400},
        {country: 'Turkey', orders: 800},
        {country: 'Egypt', orders: 755},
        {country: 'Others', orders: 3000},
    ];

    try {
        res.status(200).json(ordersByCountries)
    } catch (e) {
        errorHandler(res, e)
    }
}

async function getOrdersLastMonth(req:any, res:any) {
    const today = new Date();

    const currDate = {
        day: today.getDate(),
        month: today.getMonth() + 1,
        year: today.getFullYear()
    };

    const ordersLastMonth: any[] = [
        { day: 1, tour: '3-Days Tokyo Tour', user: 'ping-pong@mail.ru', cost: 1220 },
        { day: 2, tour: 'USA, New York', user: 'solo-song@mail.ru', cost: 320 },
        { day: 3, tour: 'Rome in a Day Tour with Vatican and Colosseum', user: 'ping-pong@mail.ru', cost: 780 },
        { day: 5, tour: '3-Days Tokyo Tour', user: 'solo-song@mail.ru', cost: 220 },
        { day: 15, tour: 'NY Travel', user: 'ping-pong@mail.ru', cost: 900 },
        { day: 15, tour: 'Northern Lights Tour', user: 'ping-pong@mail.ru', cost: 550 },
        { day: 17, tour: '3-Days Tokyo Tour', user: 'ping-pong@mail.ru', cost: 600 },
        { day: 24, tour: 'NY Travel', user: 'yana-triphelper@mail.ru', cost: 370 },
        { day: 29, tour: 'Valletta City Tour', user: 'ping-pong@mail.ru', cost: 490 },
    ];

    try {
        res.status(200).json({orders: ordersLastMonth, total: 214000})
    } catch (e) {
        errorHandler(res, e)
    }
}

async function getGeneralStatistic(req:any, res:any) {
    const today = new Date();
    const currDate = {
        day: today.getDate(),
        month: today.getMonth() + 1,
        year: today.getFullYear()
    };
    let income = await Order.aggregate([
        {
            $group: {
                _id: null,
                count: { $sum: "$cost" }
            }
        }
    ] );

    income = income[0].count;

    let tours = await Tour.find().countDocuments() *34;
    let orders = await Order.find().countDocuments() *12;
    let users = await User.find().countDocuments() *17;

    try {
        res.status(200).json({tours, orders, users, income})
    } catch (e) {
        errorHandler(res, e)
    }
}

export { getMonthlyIncome, getPopularDestnationsMonth, getOrdersLastMonth, getGeneralStatistic }
