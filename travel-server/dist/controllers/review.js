"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const errorHandler_1 = __importDefault(require("../utils/errorHandler"));
const Review_1 = __importDefault(require("../models/Review"));
function create(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const review = new Review_1.default({
            title: req.body.title,
            info: req.body.info,
            img: req.body.img,
            confirmed: req.body.confirmed,
            userId: req.body.userId
        });
        try {
            yield review.save();
            res.status(201).json(review);
        }
        catch (e) {
            errorHandler_1.default(res, e);
        }
    });
}
exports.create = create;
function getReviews(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let confirmedFilter = {};
            if (req.query.confirmed === "false") {
                // /review?confirmed=false
                confirmedFilter.confirmed = false;
            }
            if (req.query.confirmed === "true") {
                // /review?confirmed=false
                confirmedFilter.confirmed = true;
            }
            const review = yield Review_1.default.find(confirmedFilter);
            res.status(200).json(review);
        }
        catch (e) {
            errorHandler_1.default(res, e);
        }
    });
}
exports.getReviews = getReviews;
function remove(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield Review_1.default.deleteOne({ _id: req.params.id });
            res.status(200).json({
                message: 'Review deleted'
            });
        }
        catch (e) {
            errorHandler_1.default(res, e);
        }
    });
}
exports.remove = remove;
//# sourceMappingURL=review.js.map