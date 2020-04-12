import errorHandler from '../utils/errorHandler';
import Location from "../models/Location";

async function create(req:any, res:any) {
    console.log(req.body)
    const location = new Location({
        ru: req.body.ru,
        en: req.body.en
    });

    console.log(location)

    try {
        await location.save();
        res.status(201).json(location);
    } catch (e) {
        errorHandler(res, e)
    }
}

async function getLocationById(req:any, res:any) {
    let lang: string = req.query.lang ? req.query.lang : 'en';
    try {
        const location: any = await Location.findById(req.params.id);
        res.status(200).json(location[lang]);
    } catch (e) {
        errorHandler(res, e)
    }
}

/*async function isExist(req:any, res:any) {
    let country:string = req.query.country;
    let town:string = req.query.town;
console.log(country, town, {country, town})

    try {
        const location = await Location.find({country, towns: town});
        res.status(200).json(location)
    } catch (e) {
        errorHandler(res, e)
    }
}*/


async function getLocations(req:any, res:any) {
    let lang: string = req.query.lang ? req.query.lang : 'en';
    try {
        const locations = await Location.find();
        let resLocations: any = [];
        locations.forEach((location: any) => {
            resLocations.push(location[lang])
        });

        res.status(200).json(resLocations)
    } catch (e) {
        errorHandler(res, e)
    }
}

async function getAllLangsLocations(req:any, res:any) {
    try {
        const locations = await Location.find({});

        res.status(200).json(locations)
    } catch (e) {
        errorHandler(res, e)
    }
}

async function updateLocationById(req:any, res:any) {
    try {
        console.log(req.body)
        const location = await Location.findOneAndUpdate(
            {_id: req.params.id},
            {$set: req.body},
            {new: true}
        );

        res.status(200).json(location)
    } catch (e) {
        errorHandler(res, e)
    }
}

async function deleteLocationById(req:any, res:any) {
    try {
        await Location.deleteOne({_id: req.params.id})
        res.status(200).json({
            message: 'Location deleted'
        })
    } catch (e) {
        errorHandler(res, e)
    }
}

export {create, getLocationById/*, isExist*/, getLocations, getAllLangsLocations, updateLocationById, deleteLocationById}
