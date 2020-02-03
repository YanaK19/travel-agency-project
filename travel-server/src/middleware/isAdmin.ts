export default function isAdmin(req:any, res:any, next: any){
    if(req.user.role !== 'admin'){
        return res.status(403).send({
            "error": {
                "message": "access forbidden: not admin"
            }
        });
    }

    next();
}