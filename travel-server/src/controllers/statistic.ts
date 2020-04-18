import errorHandler from '../utils/errorHandler';
import Review from '../models/Review';
import User from '../models/User';
import Order from '../models/Order';
import Tour from '../models/Tour';
import Location from '../models/Location';
import Todo from '../models/Todo';

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

    let income: any = await Order.aggregate([
        {
            $group: {
                _id: null,
                total_cost: { $sum: "$cost" }
            }
        }
    ]);



    let income2MonthsAgo: any = await Order.aggregate([
        { $match: {"date.month": currDate.month-2? currDate.month-2:12, "date.year": currDate.month-2?currDate.year: currDate.year-1} },
        {
            $group: {
                _id: null,
                total_cost: { $sum: "$cost" }
            }
        }
    ]);

    let income1MonthAgo: any = await Order.aggregate([
        { $match: {"date.month": currDate.month-1? currDate.month-1:12, "date.year": currDate.month-1?currDate.year: currDate.year-1}  },
        {
            $group: {
                _id: null,
                total_cost: { $sum: "$cost" }
            }
        }
    ]);

    let income2YearsAgo: any = await Order.aggregate([
        { $match: {"date.year": currDate.year-2} },
        {
            $group: {
                _id: null,
                total_cost: { $sum: "$cost" }
            }
        }
    ]);

    let income1YearAgo: any = await Order.aggregate([
        { $match: {"date.year": currDate.year-1}  },
        {
            $group: {
                _id: null,
                total_cost: { $sum: "$cost" }
            }
        }
    ]);

    const forMoreRealData = 17;

    income2MonthsAgo = income2MonthsAgo.length? income2MonthsAgo[0].total_cost + forMoreRealData: 0 + forMoreRealData;
    income1MonthAgo = income1MonthAgo.length? income1MonthAgo[0].total_cost + forMoreRealData: 0 + forMoreRealData;
    income2YearsAgo = income2YearsAgo.length? income2YearsAgo[0].total_cost + forMoreRealData: 0 + forMoreRealData;
    income1YearAgo = income1YearAgo.length? income1YearAgo[0].total_cost + forMoreRealData: 0 + forMoreRealData;

    let tours = await Tour.find().countDocuments();
    let orders = await Order.find().countDocuments();
    let users = await User.find().countDocuments();

    try {
        res.status(200).json({tours, orders, users, income: income[0].total_cost,
            income2MonthsAgo, income1MonthAgo, income2YearsAgo, income1YearAgo})
    } catch (e) {
        errorHandler(res, e)
    }
}

async function createTask(req:any, res:any) {
    const newTask = new Todo({
        task: req.body.task,
        done: "false"
    });

    try {
        await newTask.save();
        res.status(201).json(newTask);
    } catch (e) {
        errorHandler(res, e)
    }
}

async function updateTask(req:any, res:any) {
    try {
        const updatedTask = await Todo.findOneAndUpdate(
            {_id: req.params.id},
            {$set: req.body},
            {new: true}
        );

        res.status(200).json(updatedTask)
    } catch (e) {
        errorHandler(res, e)
    }
}

async function getTodoList(req:any, res:any) {
    try {
        const todoList: any = await Todo.find();

        res.status(200).json(todoList)
    } catch (e) {
        errorHandler(res, e)
    }
}

async function deleteTask(req:any, res:any) {
    try {
        await Todo.deleteOne({_id: req.params.id});
        res.status(200).json({
            message: 'Task was deleted'
        })
    } catch (e) {
        errorHandler(res, e)
    }
}

async function getMostActiveUsers(req:any, res:any) {
    const today = new Date();

    const currDate = {
        day: today.getDate(),
        month: today.getMonth() + 1,
        year: today.getFullYear()
    };


    try {
        const countOrdersGroupByUsers: any = await Order.aggregate( [
            {
              $match: {
                  confirmed: true
              }
            },
            {
                $group : {
                _id : "$userId",
                count: { $sum: 1 }
                }
            },
            {
                $sort : { count: -1 }
            },
            { $limit : 5 }
        ]);

        let mostActiveUsers = [];

        for(let i=0; i < countOrdersGroupByUsers.length; i++) {
            let user = await User.findById(countOrdersGroupByUsers[i]._id);
            mostActiveUsers.push({user, ordersAmount: countOrdersGroupByUsers[i].count});
        }

        res.status(200).json(mostActiveUsers)
    } catch (e) {
        errorHandler(res, e)
    }
}

export { getMonthlyIncome, getPopularDestnationsMonth, getOrdersLastMonth, getGeneralStatistic,
         createTask, getTodoList, deleteTask, updateTask, getMostActiveUsers }
