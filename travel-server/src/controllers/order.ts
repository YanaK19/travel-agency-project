import errorHandler from '../utils/errorHandler';
import Order from "../models/Order";

async function create(req:any, res:any) {
    const order = new Order({
        userId: req.body.userId,
        tourId:  req.body.tourId,
        cost:  req.body.cost,
        peopleNumber: req.body.peopleNumber,
        date: req.body.date,
        confirmed:  req.body.confirmed,
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
/*        let confirmedFilter: any = {};

        if(req.query.confirmed === "false"){
            // /order?confirmed=false
            confirmedFilter.confirmed = false;
        }

        if(req.query.confirmed === "true"){
            // /order?confirmed=false
            confirmedFilter.confirmed = true;
        }

        const review = await Order.find(confirmedFilter);
        res.status(200).json(review)*/
    } catch (e) {
        errorHandler(res, e)
    }
}

async function remove(req:any, res:any) {
    try {
        await Order.deleteOne({_id: req.params.id})
        res.status(200).json({
            message: 'Order deleted'
        })
    } catch (e) {
        errorHandler(res, e)
    }
}

export {create, getOrders, remove}
