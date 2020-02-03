import {ExtractJwt, Strategy} from "passport-jwt";
import mongoose from "mongoose";
import {keys} from "../config/keys";

const User = mongoose.model('users');

/*
how the token is extracted
from the request or verified:
 */
const options = {
    //returns the encoded JWT string or null
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    // verifying the token's signature
    // (REQUIRED because secretOrKeyProvider is provided)
    secretOrKey: keys.jwt
};

export default (passport:any) => {
    passport.use(
        new Strategy(options, async (payload, done) => {
            try {
                const user = await User.findById(payload.userId).select('role email id');

                if (user) {
                    done(null, user);
                } else {
                    done(null, false);
                }
            }catch(e){
                console.log(e)
            }
        })
    )
};