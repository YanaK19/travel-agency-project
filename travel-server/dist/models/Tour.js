"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
const tourSchema = new Schema({
    title: { type: String },
    restType: { type: [String] },
    transportType: { type: String },
    cost: { type: Number },
    route: {
        fromCountry: { type: String },
        fromTown: { type: String },
        toCountry: { type: String },
        toTown: { type: String }
    },
    moreInfo: { type: String },
    images: {
        type: [String],
        default: ''
    },
    dates: [{
            dateFrom: {
                day: { type: Number },
                month: { type: Number },
                year: { type: Number }
            },
            dateTo: {
                day: { type: Number },
                month: { type: Number },
                year: { type: Number }
            }
        }],
    discount: { type: Number },
    bookedMax: { type: Number },
    booked: { type: Number },
    views: { type: Number }
});
exports.default = mongoose_1.default.model('tours', tourSchema);
//# sourceMappingURL=Tour.js.map