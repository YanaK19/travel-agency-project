"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const tour_1 = require("../controllers/tour");
const tourRoutes = express_1.default.Router();
tourRoutes.post('/', tour_1.create);
tourRoutes.delete('/:id', tour_1.remove);
tourRoutes.put('/:id', tour_1.update);
tourRoutes.get('/:id', tour_1.getTourById);
tourRoutes.get('/', tour_1.getFilSortTours);
exports.default = tourRoutes;
//# sourceMappingURL=tour.js.map