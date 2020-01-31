import User from "../models/User";
import errorHandler from '../utils/errorHandler';

async function create(req:any, res:any) {
    const user = new User({
        email: req.body.email,
        password: req.body.password,
        name: req.body.name,
        telephone: req.body.telephone,
        favouriteTourIds: req.body.favouriteTourIds,
        bookedTourIds: req.body.bookedTourIds,
        role: req.body.role
    });

    try {
        await user.save()
        res.status(201).json(user)
    } catch (e) {
        errorHandler(res, e)
    }
}

export {create}