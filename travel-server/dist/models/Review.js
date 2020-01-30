"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
const reviewSchema = new Schema({
    title: { type: String },
    info: { type: String },
    img: { type: String },
    confirmed: { type: Boolean },
    userId: {
        ref: 'users',
        type: Schema.Types.ObjectId
    }
});
exports.default = mongoose_1.default.model('reviews', reviewSchema);
//# sourceMappingURL=Review.js.map