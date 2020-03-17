import errorHandler from '../utils/errorHandler';
import Range from "../models/Range";
import Tour from '../models/Tour';

async function create(req:any, res:any) {
    const range = new Range({
        ru: req.body.ru,
        en:  req.body.en,
    });

    try {
        await range.save();
        res.status(201).json(range);
    } catch (e) {
        errorHandler(res, e)
    }
}

async function getRangeById(req:any, res:any) {
    let lang: string = req.query.lang ? req.query.lang : 'en';
    try {
        const range:any = await Range.findById(req.params.id);
        res.status(200).json(range[lang])
    } catch (e) {
        errorHandler(res, e)
    }
}

async function getRanges(req:any, res:any) {
    let lang: string = req.query.lang ? req.query.lang : 'en';
    try {
        const ranges = await Range.find({});
        let resRanges: any = [];
        ranges.forEach((range: any) => {
            resRanges.push(range[lang]);
        });

        res.status(200).json(resRanges)
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
