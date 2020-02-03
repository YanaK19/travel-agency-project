import User from "../models/User";
import errorHandler from '../utils/errorHandler';
import generateToken from "../utils/generateToken";
import {keys} from "../config/keys";
import bcrypt from "bcryptjs"

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
        await user.save();
        res.status(201).json(user)
    } catch (e) {
        errorHandler(res, e)
    }
}

async function login(req: any, res: any) {
    const candidate:any = await User.findOne({email: req.body.email});

    if(candidate){
        const isPasswordCorrect = bcrypt.compareSync(req.body.password, candidate.password);

        if(isPasswordCorrect){
            const token:string = generateToken(candidate);
            const user:any = await User.findOne({email: req.body.email}, {password: 0});
            res.status(200).json({token: `Bearer ${token}`, user});
        }else{
            res.status.json({
                message: 'Wrong password'
            })
        }

    }else{
        res.status(404).json({
            message: 'User with such email not found'})
    }
}

async function register(req: any, res: any) {
    const candidate = await User.findOne({email: req.body.email});

    if (candidate) {
        res.status(409).json({
            message: 'User with such email is already exists.' })
    } else {
        const salt = bcrypt.genSaltSync(10);
        const password = req.body.password;

        const user: any = new User({
            email: req.body.email,
            password: bcrypt.hashSync(password, salt),
            name: req.body.name,
            telephone: req.body.telephone,
            favouriteTourIds: req.body.favouriteTourIds,
            bookedTourIds: req.body.bookedTourIds,
            role: req.body.role
        });

        const token:string = generateToken(user);

        try {
           await user.save();

           const customer = {
               email: req.body.email,
               name: req.body.name,
               telephone: req.body.telephone,
               favouriteTourIds: req.body.favouriteTourIds,
               bookedTourIds: req.body.bookedTourIds,
               role: req.body.role
           };

           res.status(201).json({token: `Bearer ${token}`, customer});
        } catch(e) {
            errorHandler(res, e)
        }
    }
}


export {create, login, register}