import errorHandler from '../utils/errorHandler';
import Review from "../models/Review";
import Range from "../models/Range";
import Tour from "../models/Tour";

async function create(req:any, res:any) {
    const today = new Date();
    const currDate = {
        day: today.getDate(),
        month: today.getMonth() + 1,
        year: today.getFullYear()
    };

    const review = new Review({
        title: req.body.title,
        info:  req.body.info,
        img:  req.body.img,
        date: currDate,
        confirmed:  false,
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
    let limitReviews = 0;

    try {
        let filters: any = [];
        for (let paramName in req.query) {
            if(paramName === "userId"){
                filters.push({userId: req.query[paramName]});
            }
            if(paramName === "tourId") {
                filters.push({tourId: req.query[paramName]});
            }
            if(paramName === "limit") {
                limitReviews = +req.query[paramName];
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
            if(limitReviews) {
                reviews = await Review.find({ $and: filters}).sort({"date.year": -1, "date.month": -1, "date.day": -1}).limit(limitReviews);
            } else {
                reviews = await Review.find({ $and: filters}).sort({"date.year": -1, "date.month": -1, "date.day": -1});
            }

        }else {
            if(limitReviews) {
                reviews = await Review.find().sort({"date.year": -1, "date.month": -1, "date.day": -1}).limit(limitReviews);
            } else{
                reviews = await Review.find().sort({"date.year": -1, "date.month": -1, "date.day": -1});
            }
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
        const review = await Review.findOneAndUpdate(
            {_id: req.params.id},
            {$set: req.body},
            {new: true}
        );
        res.status(200).json(review)
    } catch (e) {
        errorHandler(res, e)
    }
}

async function remove(req:any, res:any) {
    try {
        await Review.deleteOne({_id: req.params.id});
        res.status(200).json({
            message: 'Review deleted'
        })
    } catch (e) {
        errorHandler(res, e)
    }
}

export {create, getReviews, remove, getReviewById, update}

