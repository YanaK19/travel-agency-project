import Tour from "../models/Tour";
import errorHandler from '../utils/errorHandler';
import Review from '../models/Review';
async function create(req:any, res:any) {
    let lang: string = req.query.lang ? req.query.lang : 'en';
    const tour: any = new Tour({
        ru: req.body.ru,
        en: req.body.en,
        images: req.body.images.length ? req.body.images : [],
        dates: req.body.dates,
        cost: req.body.cost,
        discount: req.body.discount,
        bookedMax: req.body.bookedMax,
        booked: req.body.booked,
        views: req.body.views,
    });

    try {
        await tour.save();

        let resTour = {
            _id: tour._id,
            title: tour[lang].title,
            restType: tour[lang].restType,
            transportType: tour[lang].transportType,
            route: tour[lang].route,
            moreInfo: tour[lang].moreInfo,
            images: tour.images,
            dates: tour.dates,
            cost: tour.cost,
            discount: tour.discount,
            bookedMax: tour.bookedMax,
            booked: tour.booked,
            views: tour.views
        };

        res.status(201).json(resTour);
    } catch (e) {
        errorHandler(res, e)
    }
}

async function remove(req:any, res:any) {
    let lang: string = req.query.lang ? req.query.lang : 'en';
    try {
        await Review.deleteOne({tourId: req.params.id});
        await Tour.deleteOne({_id: req.params.id});
        let tours = await Tour.find({});

        let resTours:any = [];
        tours.forEach((tour: any) => {
            resTours.push({
                _id: tour._id,
                title: tour[lang].title,
                restType: tour[lang].restType,
                transportType: tour[lang].transportType,
                route: tour[lang].route,
                moreInfo: tour[lang].moreInfo,
                images: tour.images,
                dates: tour.dates,
                cost: tour.cost,
                discount: tour.discount,
                bookedMax: tour.bookedMax,
                booked: tour.booked,
                views: tour.views
            })
        });
        res.status(200).json(resTours);
    } catch (e) {
        errorHandler(res, e)
    }
}

async function update(req:any, res:any) {
    let lang: string = req.query.lang ? req.query.lang : 'en';
    let requestData = req.body;

    if(req.files) {
        const files = req.files.map((file: any) => file.path);
        const t: any = await Tour.findById(req.params.id);
        t.images = t.images.concat(files);
        requestData = t;
    }


    try {
        const tour: any = await Tour.findOneAndUpdate(
            {_id: req.params.id},
            {$set: requestData},
            {new: true}
        );

        let tours = await Tour.find({});
        let resTours:any = [];
        tours.forEach((tour: any) => {
            resTours.push({
                _id: tour._id,
                title: tour[lang].title,
                restType: tour[lang].restType,
                transportType: tour[lang].transportType,
                route: tour[lang].route,
                moreInfo: tour[lang].moreInfo,
                images: tour.images,
                dates: tour.dates,
                cost: tour.cost,
                discount: tour.discount,
                bookedMax: tour.bookedMax,
                booked: tour.booked,
                views: tour.views
            });
        });

        res.status(200).json(resTours);
    } catch (e) {
        errorHandler(res, e)
    }
}


async function getTourById(req:any, res:any) {
    try {
        let resTour: any;
        let lang: string = req.query.lang ? req.query.lang : 'en';
        let fields: any = {
            [lang]: 1,
            cost: 1,
            images:1,
            dates: 1,
            discount: 1,
            bookedMax: 1,
            booked: 1,
            views: 1
        };

        const tour: any = await Tour.findById(req.params.id, fields);

        resTour = {
            _id: tour._id,
            title: tour[lang].title,
            restType: tour[lang].restType,
            transportType: tour[lang].transportType,
            route: tour[lang].route,
            moreInfo: tour[lang].moreInfo,
            images: tour.images,
            dates: tour.dates,
            cost: tour.cost,
            discount: tour.discount,
            bookedMax: tour.bookedMax,
            booked: tour.booked,
            views: tour.views
        };
        res.status(200).json(resTour);
    } catch (e) {
        errorHandler(res, e);
    }
}

async function getFilSortTours(req:any, res:any){
    let lang: string = req.query.lang ? req.query.lang : 'en';

   //req.query - object
    try{
        const permFilters: string[] = ["restType", "transportType",
                                       "fromCountry", "toCountry",
                                       "dateFrom", "dateTo",
                                       "discount"
                                      ];

        let filters: any = [];
        let fields: any = {
            [lang]: 1,
            cost: 1,
            images:1,
            dates: 1,
            discount: 1,
            bookedMax: 1,
            booked: 1,
            views: 1
        };

        let field: string;
        for (let paramName in req.query){
            if(permFilters.indexOf( paramName) != -1){
                if(paramName === "dateFrom" || paramName === "dateTo"){
                if(paramName === "dateFrom"){
                    //   /tour?...dateFrom=11.09.2020
                    let [day, month, year] = req.query[paramName].split(".");

                    filters.push( { $or: [
                         {
                        dates:
                            {$elemMatch: {
                                           "dateFrom.day" : {$gte: +day},
                                           "dateFrom.month" : {$eq: +month},
                                           "dateFrom.year" : {$eq: +year}
                                            }
                             }
                        },
                         {
                             dates:
                                 {$elemMatch: {
                                         "dateFrom.month" : {$gt: +month},
                                         "dateFrom.year" : {$eq: +year}
                                     }
                                 }
                         },
                        {
                            dates:
                                {$elemMatch: {
                                        "dateFrom.year" : {$gt: +year}
                                    }
                                }
                        }
                         ]});
                }
                if(paramName === "dateTo"){
                    //   /tour?...dateTo=11.09.2020
                    let [day, month, year] = req.query[paramName].split(".");
                    console.log(day, month, year)
                    filters.push( { $or: [
                            {
                                dates:
                                    {$elemMatch: {
                                            "dateTo.day" : {$lte: +day},
                                            "dateTo.month" : {$eq: +month},
                                            "dateTo.year" : {$eq: +year}
                                        }
                                    }
                            },
                            {
                                dates:
                                    {$elemMatch: {
                                            "dateTo.month" : {$lt: +month},
                                            "dateTo.year" : {$eq: +year}
                                        }
                                    }
                            },
                            {
                                dates:
                                    {$elemMatch: {
                                            "dateTo.year" : {$lt: +year}
                                        }
                                    }
                            }
                        ]});
                }
                }else if(paramName === "discount"){
                    filters.push({discount: {$gt: 0}});
                } else if (paramName === "fromCountry"){
                    field = lang + '.route.fromCountry';
                    filters.push({[field]: {$regex: req.query[paramName], $options: 'i'}});
                } else if (paramName === "toCountry"){
                    field = lang + '.route.toCountry';
                    filters.push({[field]: {$regex: req.query[paramName], $options: 'i'}})
                } else{
                    field = lang + '.' + paramName;
                    filters.push({ [field]: req.query[paramName]});
                }
            }
        }

        let tours:any;
        if(req.query.sortBy){
            let sortParam:any = {};
            if(req.query.sortBy === "views" || req.query.sortBy === "просмотрам"){
                sortParam.views = -1;
            }
            if(req.query.sortBy === "cost" || req.query.sortBy === "цене"){
                sortParam.cost = 1;
            }
            if(req.query.sortBy === "discount" || req.query.sortBy === "скидке"){
                sortParam.discount = -1;
            }

            if(filters.length){
                // /tour?sortBy=...&restType=...&discount=...
                tours = await Tour.find({ $and: filters}, fields).sort(sortParam);
            }else {
                // /tour?sortBy=...
                tours = await Tour.find({}, fields).sort(sortParam);
            }
        }else{
            if(filters.length){
                // /tour?restType=...&discount=...
                tours = await Tour.find({ $and: filters}, fields);
            }else {
                // /tour
                tours = await Tour.find({}, fields);
            }
        }

        let resTours:any = [];
        tours.forEach((tour: any) => {
            resTours.push({
                _id: tour._id,
                title: tour[lang].title,
                restType: tour[lang].restType,
                transportType: tour[lang].transportType,
                route: tour[lang].route,
                moreInfo: tour[lang].moreInfo,
                images: tour.images,
                dates: tour.dates,
                cost: tour.cost,
                discount: tour.discount,
                bookedMax: tour.bookedMax,
                booked: tour.booked,
                views: tour.views
            })
        });

        res.status(200).json(resTours);
    } catch (e) {
        console.log('here')
        errorHandler(res, e)
    }
}

async function getAllLangsTours(req:any, res:any) {
    try{
        const tours = await Tour.find({});
        res.status(200).json(tours);
    } catch (e) {
        errorHandler(res, e);
    }
}

async function getAllLangsToursById(req:any, res:any) {
    try{
        const tour = await Tour.findById(req.params.id);
        res.status(200).json(tour);
    } catch (e) {
        errorHandler(res, e);
    }
}

export {create, remove, update, getTourById, getFilSortTours, getAllLangsTours, getAllLangsToursById}
