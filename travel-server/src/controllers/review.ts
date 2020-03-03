import errorHandler from '../utils/errorHandler';
import Review from "../models/Review";
import Range from "../models/Range";
import Tour from "../models/Tour";

async function create(req:any, res:any) {
    const review = new Review({
        title: req.body.title,
        info:  req.body.info,
        img:  req.body.img,
        date: req.body.date,
        confirmed:  req.body.confirmed,
        userId:  req.body.userId,
        tourId: req.body.tourId
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
        let filters: any = [];
        for (let paramName in req.query) {
            if(paramName === "userId"){
                filters.push({userId: req.query[paramName]});
            }
            if(paramName === "tourId") {
                filters.push({tourId: req.query[paramName]});
            }
            if(req.query.confirmed === "false"){
                // /review?confirmed=false
                filters.push({confirmed: false});
            }

            if(req.query.confirmed === "true"){
                // /review?confirmed=false
                filters.push({confirmed: true});
            }
        }

        let reviews;
        if(filters.length) {
            reviews = await Review.find({ $and: filters});
        }else {
            reviews = await Review.find();
        }

        res.status(200).json(reviews)
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
