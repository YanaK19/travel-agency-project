import jwt from "jsonwebtoken";
import {keys} from "../config/keys";

export default (user:any) => {
    const token = jwt.sign({
        email: user.email,
        role: user.role,
        userId: user._id
    }, keys.jwt, {expiresIn: '3h'});

    return token;
}