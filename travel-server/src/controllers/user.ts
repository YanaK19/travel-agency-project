import User from "../models/User";
import errorHandler from '../utils/errorHandler';

async function create(req:any, res:any) {
    const user = new User({
        b: req.body.b

    })

    try {
        await user.save()
        res.status(201).json(user)
    } catch (e) {
        errorHandler(res, e)
    }
}

export {create}