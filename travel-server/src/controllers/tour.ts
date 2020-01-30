import Tour from "../models/Tour";
import errorHandler from '../utils/errorHandler';

async function create(req:any, res:any) {
    const tour = new Tour({
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
       /* image: req.body.image ? req.body.image : ''*/
    });

    try {
        await tour.save();
        res.status(201).json(tour);
    } catch (e) {
        errorHandler(res, e)
    }
}

async function remove(req:any, res:any) {
    try {
        await Tour.deleteOne({_id: req.params.id})
        res.status(200).json({
            message: 'Tour deleted'
        })
    } catch (e) {
        errorHandler(res, e)
    }
}

async function update(req:any, res:any) {
    try {
        const tour = await Tour.findOneAndUpdate(
            {_id: req.params.id},
            {$set: req.body},
            {new: true}
        );
        res.status(200).json(tour)
    } catch (e) {
        errorHandler(res, e)
    }
}


async function getTourById(req:any, res:any) {
    try {
        const tour = await Tour.find({_id: req.params.id})
        res.status(200).json(tour)
    } catch (e) {
        errorHandler(res, e)
    }
}

async function getFilSortTours(req:any, res:any){
   //req.query - object
    try{
        const permFilters: string[] = ["restType", "transportType",
                                       "fromCounty", "toCountry",
                                       "dateFrom", "dateTo",
                                       "discount"
                                      ];

        let filters: any = [];

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
                }else{
                    let query:any = {};
                    query[paramName] = req.query[paramName];
                    filters.push(query);
                }
            }
        }
       /* console.log(filters)*/

        const tours = await Tour.find({ $and: filters});
        res.status(200).json(tours)

    } catch (e) {
        errorHandler(res, e)
    }
}



export {create, remove, update, getTourById, getFilSortTours}