import errorHandler from '../utils/errorHandler';
import Review from "../models/Review";
import Range from "../models/Range";
import Tour from "../models/Tour";

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

async function getReviews(req:any, res:any) {
    try {
        let confirmedFilter: any = {};

        if(req.query.confirmed === "false"){
            // /review?confirmed=false
            confirmedFilter.confirmed = false;
        }

        if(req.query.confirmed === "true"){
            // /review?confirmed=false
            confirmedFilter.confirmed = true;
        }

        const review = await Review.find(confirmedFilter);
        res.status(200).json(review)
    } catch (e) {
        errorHandler(res, e)
    }
}

async function getReviewById(req:any, res:any) {
    try {
        const range = await Range.findById(req.params.id);
        res.status(200).json(range)
    } catch (e) {
        errorHandler(res, e)
    }
}

async function update(req:any, res:any) {
    try {
        const tour = await Tour.findOneAndUpdate(
            {_id: req.params.id},
            {$set: req.body},
            {new: true}
        );
        res.status(200).json(tour)
    } catch (e) {
        errorHandler(res, e)
    }
}

async function remove(req:any, res:any) {
    try {
        await Review.deleteOne({_id: req.params.id})
        res.status(200).json({
            message: 'Review deleted'
        })
    } catch (e) {
        errorHandler(res, e)
    }
}

export {create, getReviews, remove, getReviewById, update}