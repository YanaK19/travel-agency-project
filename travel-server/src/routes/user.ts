import express from 'express';
import {create, getUserById, login, register, update, checkIsExistByEmail, resetPasswordByEmail} from '../controllers/user';
import authenticateJwt from "../middleware/authenticateJwt";
import isAdmin from "../middleware/isAdmin";
import {upload} from "../middleware/upload"
/*import authenticateVK from '../middleware/passportVK'
import passport from '@types/passport';*/
const userRoutes = express.Router();

userRoutes.post('/', authenticateJwt, isAdmin, create);
userRoutes.get('/:id', getUserById);
userRoutes.get('/check/users', checkIsExistByEmail);
userRoutes.post('/login', login);
userRoutes.post('/register', register);
userRoutes.put('/', authenticateJwt, upload.single('image'), update);
userRoutes.put('/reset/password', resetPasswordByEmail);
/*userRoutes.get('/auth/vkontakte/callback',
    passport.authenticate('vkontakte', { failureRedirect: '/login' }),
    function(req, res) {
        // Successful authentication, redirect home.
        res.redirect('/');
    });*/

export default userRoutes;
