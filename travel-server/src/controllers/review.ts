import errorHandler from '../utils/errorHandler';
import Review from "../models/Review";

async function create(req:any, res:any) {
    const review = new Review({
        title: req.body.title,
        info:  req.body.info,
        img:  req.body.img,
        confirmed:  req.body.confirmed,
        userId:  req.body.userId
    });

    try {
        await review.save();
        res.status(201).json(review);
    } catch (e) {
        errorHandler(res, e)
    }
}

async function getAll(req:any, res:any) {
    try {
        const review = await Review.find()
        res.status(200).json(review)
    } catch (e) {
        errorHandler(res, e)
    }
}

export {create, getAll}