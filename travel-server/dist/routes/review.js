"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const review_1 = require("../controllers/review");
const reviewRoutes = express_1.default.Router();
reviewRoutes.post('/', review_1.create);
reviewRoutes.get('/', review_1.getReviews);
reviewRoutes.delete('/:id', review_1.remove);
exports.default = reviewRoutes;
//# sourceMappingURL=review.js.map