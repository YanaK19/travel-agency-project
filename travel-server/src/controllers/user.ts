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

async function login(req: any, res: any) {
    const candidate = await User.findOne({email: req.body.email});

    if (candidate) {

    } else {
        // Пользователя нет, ошибка
        res.status(404).json({
            message: 'Wrong email. Try again...'
        })
    }
}

async function register(req: any, res: any) {
    const candidate = await User.findOne({email: req.body.email});

    if (candidate) {
        res.status(409).json({
            message: 'Such email is already exists.'
        })
    } else {
        //create user
        try {
          //  await user.save()
           // res.status(201).json(user)
        } catch(e) {
            errorHandler(res, e)
        }
    }
}


export {create, login, register}