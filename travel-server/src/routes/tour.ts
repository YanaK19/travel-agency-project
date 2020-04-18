import express from 'express';
import {
    create,
    remove,
    update,
    getTourById,
    getFilSortTours,
    getAllLangsTours,
    getAllLangsToursById
} from '../controllers/tour';
import authenticateJwt from "../middleware/authenticateJwt";
import isAdmin from "../middleware/isAdmin";
import {upload} from '../middleware/upload';
const tourRoutes = express.Router();

tourRoutes.post('/', authenticateJwt, isAdmin, create);
tourRoutes.delete('/:id', authenticateJwt, isAdmin, remove);
tourRoutes.put('/:id', authenticateJwt, isAdmin, upload.array('images'), update);
tourRoutes.get('/:id', getTourById);
tourRoutes.get('/', getFilSortTours);
tourRoutes.get('/allLangs/tours', getAllLangsTours);
tourRoutes.get('/allLangs/:id', getAllLangsToursById);

export default tourRoutes;
