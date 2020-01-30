"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
const orderSchema = new Schema({
    userId: {
        ref: 'users',
        type: Schema.Types.ObjectId
    },
    tourId: {
        ref: 'tours',
        type: Schema.Types.ObjectId
    },
    cost: { type: Number },
    peopleNumber: { type: Number },
    date: {
        type: String
    },
    confirmed: {
        type: Boolean
    }
});
exports.default = mongoose_1.default.model('reviews', orderSchema);
//# sourceMappingURL=Order.js.map