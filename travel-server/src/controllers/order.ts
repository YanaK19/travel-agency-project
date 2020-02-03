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
    console.log(req.user)
    try {
        let confirmedFilter: any = {};

        if(req.query.confirmed === "false"){
            // /order?confirmed=false
            confirmedFilter.confirmed = false;
        }

        if(req.query.confirmed === "true"){
            // /order?confirmed=false
            confirmedFilter.confirmed = true;
        }

        const review = await Order.find(confirmedFilter);
        res.status(200).json(review)
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