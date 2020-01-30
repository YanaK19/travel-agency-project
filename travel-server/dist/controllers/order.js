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
const Order_1 = __importDefault(require("../models/Order"));
function create(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const order = new Order_1.default({
            userId: req.body.userId,
            tourId: req.body.tourId,
            cost: req.body.cost,
            confirmed: req.body.confirmed
        });
        try {
            yield order.save();
            res.status(201).json(order);
        }
        catch (e) {
            errorHandler_1.default(res, e);
        }
    });
}
exports.create = create;
function getOrders(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let confirmedFilter = {};
            if (req.query.confirmed === "false") {
                // /order?confirmed=false
                confirmedFilter.confirmed = false;
            }
            if (req.query.confirmed === "true") {
                // /order?confirmed=false
                confirmedFilter.confirmed = true;
            }
            const review = yield Order_1.default.find(confirmedFilter);
            res.status(200).json(review);
        }
        catch (e) {
            errorHandler_1.default(res, e);
        }
    });
}
exports.getOrders = getOrders;
function remove(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield Order_1.default.deleteOne({ _id: req.params.id });
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
//# sourceMappingURL=order.js.map