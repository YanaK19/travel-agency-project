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
const Tour_1 = __importDefault(require("../models/Tour"));
const errorHandler_1 = __importDefault(require("../utils/errorHandler"));
function create(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const tour = new Tour_1.default({
            title: req.body.title,
            restType: req.body.restType,
            transportType: req.body.transportType,
            cost: req.body.cost,
            route: req.body.route,
            moreInfo: req.body.moreInfo,
            images: req.body.images,
            dates: req.body.dates,
            discount: req.body.discount,
            bookedMax: req.body.bookedMax,
            booked: req.body.booked,
            views: req.body.views,
        });
        try {
            yield tour.save();
            res.status(201).json(tour);
        }
        catch (e) {
            errorHandler_1.default(res, e);
        }
    });
}
exports.create = create;
function remove(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield Tour_1.default.deleteOne({ _id: req.params.id });
            res.status(200).json({
                message: 'Tour deleted'
            });
        }
        catch (e) {
            errorHandler_1.default(res, e);
        }
    });
}
exports.remove = remove;
function update(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const tour = yield Tour_1.default.findOneAndUpdate({ _id: req.params.id }, { $set: req.body }, { new: true });
            res.status(200).json(tour);
        }
        catch (e) {
            errorHandler_1.default(res, e);
        }
    });
}
exports.update = update;
function getTourById(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const tour = yield Tour_1.default.findById(req.params.id);
            res.status(200).json(tour);
        }
        catch (e) {
            errorHandler_1.default(res, e);
        }
    });
}
exports.getTourById = getTourById;
function getFilSortTours(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        //req.query - object
        try {
            const permFilters = ["restType", "transportType",
                "fromCounty", "toCountry",
                "dateFrom", "dateTo",
                "discount"
            ];
            let filters = [];
            for (let paramName in req.query) {
                if (permFilters.indexOf(paramName) != -1) {
                    if (paramName === "dateFrom" || paramName === "dateTo") {
                        if (paramName === "dateFrom") {
                            //   /tour?...dateFrom=11.09.2020
                            let [day, month, year] = req.query[paramName].split(".");
                            filters.push({ $or: [
                                    {
                                        dates: { $elemMatch: {
                                                "dateFrom.day": { $gte: +day },
                                                "dateFrom.month": { $eq: +month },
                                                "dateFrom.year": { $eq: +year }
                                            }
                                        }
                                    },
                                    {
                                        dates: { $elemMatch: {
                                                "dateFrom.month": { $gt: +month },
                                                "dateFrom.year": { $eq: +year }
                                            }
                                        }
                                    },
                                    {
                                        dates: { $elemMatch: {
                                                "dateFrom.year": { $gt: +year }
                                            }
                                        }
                                    }
                                ] });
                        }
                        if (paramName === "dateTo") {
                            //   /tour?...dateTo=11.09.2020
                            let [day, month, year] = req.query[paramName].split(".");
                            console.log(day, month, year);
                            filters.push({ $or: [
                                    {
                                        dates: { $elemMatch: {
                                                "dateTo.day": { $lte: +day },
                                                "dateTo.month": { $eq: +month },
                                                "dateTo.year": { $eq: +year }
                                            }
                                        }
                                    },
                                    {
                                        dates: { $elemMatch: {
                                                "dateTo.month": { $lt: +month },
                                                "dateTo.year": { $eq: +year }
                                            }
                                        }
                                    },
                                    {
                                        dates: { $elemMatch: {
                                                "dateTo.year": { $lt: +year }
                                            }
                                        }
                                    }
                                ] });
                        }
                    }
                    else {
                        let query = {};
                        query[paramName] = req.query[paramName];
                        filters.push(query);
                    }
                }
            }
            let tours;
            if (req.query.sortBy) {
                let sortParam = {};
                if (req.query.sortBy === "views") {
                    sortParam.views = -1;
                }
                if (req.query.sortBy === "cost") {
                    sortParam.cost = -1;
                }
                if (filters.length) {
                    // /tour?sortBy=...&restType=...&discount=...
                    tours = yield Tour_1.default.find({ $and: filters }).sort(sortParam);
                }
                else {
                    // /tour?sortBy=...
                    tours = yield Tour_1.default.find().sort(sortParam);
                }
            }
            else {
                if (filters.length) {
                    // /tour?restType=...&discount=...
                    tours = yield Tour_1.default.find({ $and: filters });
                }
                else {
                    // /tour
                    tours = yield Tour_1.default.find();
                }
            }
            res.status(200).json(tours);
        }
        catch (e) {
            errorHandler_1.default(res, e);
        }
    });
}
exports.getFilSortTours = getFilSortTours;
//# sourceMappingURL=tour.js.map