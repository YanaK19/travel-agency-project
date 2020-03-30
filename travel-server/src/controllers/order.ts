import errorHandler from '../utils/errorHandler';
import Order from "../models/Order";
import Range from '../models/Range';
import User from '../models/User';
import Tour from '../models/Tour';

async function create(req:any, res:any) {
    const today = new Date();
    const currDate = {
        day: today.getDate(),
        month: today.getMonth() + 1,
        year: today.getFullYear()
    };

    const order = new Order({
        userId: req.body.userId,
        tourId:  req.body.tourId,
        cost:  req.body.cost,
        peopleNumber: req.body.peopleNumber,
        date: currDate,
        tourDate: req.body.tourDate,
        confirmed:  false,
    });

    try {
        await order.save();
        res.status(201).json(order);
    } catch (e) {
        errorHandler(res, e)
    }
}

async function getOrders(req:any, res:any) {
    try {

        let filters: any = [];
        for (let paramName in req.query) {
            if(paramName === "userId"){
                filters.push({userId: req.query[paramName]});
            }
            if(paramName === "tourId") {
                filters.push({tourId: req.query[paramName]});
            }
            if(req.query.confirmed === "false"){
                filters.push({confirmed: false});
            }

            if(req.query.confirmed === "true"){
                filters.push({confirmed: true});
            }
        }

        let orders;
        if(filters.length) {
            orders = await Order.find({ $and: filters}).sort({"date.year": -1, "date.month": -1, "date.day": -1});
        }else {
            orders = await Order.find().sort({"date.year": -1, "date.month": -1, "date.day": -1});
        }

        res.status(200).json(orders)
    } catch (e) {
        errorHandler(res, e)
    }
}

async function getOrderById(req:any, res:any) {
    try {
        const order = await Order.findById(req.params.id);
        res.status(200).json(order)
    } catch (e) {
        errorHandler(res, e)
    }
}

async function getFullInfoByOrderId(req:any, res:any) {
    try {
        const order: any = await Order.findById(req.params.id);
        const user = await User.findById(order.userId);
        const tour = await Tour.findById(order.tourId);

        const response = {order, user, tour};

        res.status(200).json(response);
    } catch (e) {
        errorHandler(res, e)
    }
}

async function remove(req:any, res:any) {
    try {
        await Order.deleteOne({_id: req.params.id});
        res.status(200).json({
            message: 'Order was deleted'
        })
    } catch (e) {
        errorHandler(res, e)
    }
}

async function update(req:any, res:any) {
    try {
        const order = await Order.findOneAndUpdate(
            {_id: req.params.id},
            {$set: req.body},
            {new: true}
        );

        res.status(200).json(order)
    } catch (e) {
        errorHandler(res, e)
    }
}

export {create, getOrders, getOrderById, remove, update, getFullInfoByOrderId}
