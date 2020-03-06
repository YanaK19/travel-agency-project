import passport from "passport";

export default function authenticateJwt(req:any, res:any, next:any) {
    passport.authenticate('jwt', {session: false},function(err, user, info) {
        if (err) return next(err);
        if (!user)
            return res.status(401).send({
                "error": {
                    "code": "INVALID_AUTHORIZATION_CODE",
                    "message": "Invalid authorization code"
                }
            });
        req.user = user;
        next();
    })(req, res, next);
}
