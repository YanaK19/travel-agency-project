import errorHandler from '../utils/errorHandler';
import Range from "../models/Range";
import Tour from '../models/Tour';

async function create(req:any, res:any) {
    const range = new Range({
        category: req.body.category,
        types:  req.body.types,
    });

    try {
        await range.save();
        res.status(201).json(range);
    } catch (e) {
        errorHandler(res, e)
    }
}

async function getRangeById(req:any, res:any) {
    try {
        const range = await Range.findById(req.params.id);
        res.status(200).json(range)
    } catch (e) {
        errorHandler(res, e)
    }
}

async function getRanges(req:any, res:any) {
    try {
        const ranges = await Range.find({});
        res.status(200).json(ranges)
    } catch (e) {
        errorHandler(res, e)
    }
}

async function remove(req:any, res:any) {
    try {
        await Range.deleteOne({_id: req.params.id})
        res.status(200).json({
            message: 'Range deleted'
        })
    } catch (e) {
        errorHandler(res, e)
    }
}

async function update(req:any, res:any) {
    try {
        const range = await Range.findOneAndUpdate(
            {_id: req.params.id},
            {$set: req.body},
            {new: true}
        );
        res.status(200).json(range)
    } catch (e) {
        errorHandler(res, e)
    }
}

export {create, remove, getRangeById, getRanges, update}
