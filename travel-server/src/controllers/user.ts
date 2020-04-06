import User from "../models/User";
import errorHandler from '../utils/errorHandler';
import generateToken from "../utils/generateToken";
import bcrypt from "bcryptjs"
import {decrypt} from '../utils/encryption';

async function update(req:any, res:any) {
    let requestData = req.body;

    if(req.file) {
      requestData.avatar = req.file.path;
    }

    try {
/*        const user = await User.findOne({_id: req.user._id});*/
        const user = await User.findOneAndUpdate(
            {_id: req.user._id},
            {$set: requestData},
            {new: true}
        );

/*
        const customer: any = await User.findById(req.user._id, {password: 0});
*/

        res.status(200).json(user)
    } catch (e) {
        errorHandler(res, e)
    }
}

async function resetPasswordByEmail(req:any, res:any) {
    const email = decrypt(req.body.encryptedEmail);
    const salt = bcrypt.genSaltSync(10);
    const password = req.body.password;

    console.log(email, password)

    try {
        const user = await User.findOneAndUpdate(
            {email},
            {password: bcrypt.hashSync(password, salt)},
            {projection: {password: 0}}
        );
        const token:string = generateToken(user);

        res.status(200).json({token: `Bearer ${token}`, user})
    } catch (e) {
        errorHandler(res, e)
    }
}

async function create(req:any, res:any) {
    const user = new User({
        email: req.body.email,
        password: req.body.password,
        name: req.body.name,
        telephone: req.body.telephone,
        favouriteTourIds: req.body.favouriteTourIds,
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
    try {
        const candidate: any = await User.findOne({email: req.body.email});

        if (candidate) {
            const isPasswordCorrect = bcrypt.compareSync(req.body.password, candidate.password);

            if (isPasswordCorrect) {
                const token: string = generateToken(candidate);
                const user: any = await User.findOne({email: req.body.email}, {password: 0});
                res.status(200).json({token: `Bearer ${token}`, user});
            } else {
                res.status(401).json({
                    message: 'Wrong password'
                })
            }

        } else {
            res.status(404).json({
                message: 'User with such email not found'
            })
        }
    } catch(e) {
        errorHandler(res, e)
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
            role: req.body.role
        });

        const token:string = generateToken(user);

        try {
           await user.save();

           const customer = {
               email: req.body.email,
               name: req.body.name,
               telephone: req.body.telephone,
               role: "customer"
           };

           res.status(201).json({token: `Bearer ${token}`, user: customer});
        } catch(e) {
            errorHandler(res, e)
        }
    }
}

async function getUserById(req:any, res:any) {
    try {
        const user: any = await User.findById(req.params.id, {password: 0});
        res.status(200).json(user);
    } catch (e) {
        errorHandler(res, e)
    }
}

async function checkIsExistByEmail(req:any, res:any) {
    try {
        const user: any = await User.findOne({email: req.query.email}, {password: 0});
        if(user) {
            res.status(200).json(user);
        } else {
            res.status(404).json({message: 'user not registered'});
        }
    } catch (e) {
        errorHandler(res, e)
    }
}

export {create, login, register, getUserById, update, checkIsExistByEmail, resetPasswordByEmail}
