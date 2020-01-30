"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    telephone: {
        type: String
    },
    favouriteTourIds: {
        ref: 'tours',
        type: Schema.Types.ObjectId
    },
    bookedTourIds: {
        ref: 'tours',
        type: Schema.Types.ObjectId
    },
    role: {
        type: String,
    }
});
exports.default = mongoose_1.default.model('users', userSchema);
//# sourceMappingURL=User.js.map