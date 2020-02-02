import errorHandler from '../utils/errorHandler';
import Location from "../models/Location";
import Range from "../models/Range";

async function create(req:any, res:any) {
    const location = new Location({
        country: req.body.country,
        towns: req.body.towns
    });

    try {
        await location.save();
        res.status(201).json(location);
    } catch (e) {
        errorHandler(res, e)
    }
}

async function getLocationById(req:any, res:any) {
    try {
        const location = await Location.findById(req.params.id);
        res.status(200).json(location)
    } catch (e) {
        errorHandler(res, e)
    }
}

async function isExist(req:any, res:any) {
    let country:string = req.query.country;
    let town:string = req.query.town;
console.log(country, town, {country, town})

    try {
        const location = await Location.find({country, towns: town});
        res.status(200).json(location)
    } catch (e) {
        errorHandler(res, e)
    }
}

export {create, getLocationById, isExist}