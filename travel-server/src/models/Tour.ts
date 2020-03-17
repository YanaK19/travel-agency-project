import mongoose from 'mongoose'
const Schema = mongoose.Schema;

const langTourSubschema = new Schema({
    title: {type: String},
    restType: {type: [String]},
    transportType: {type: String},
    route: {
        fromCountry: {type: String},
        fromTown: {type: String},
        toCountry: {type: String},
        toTown: {type: String}
    },
    moreInfo: {type: String}
}, { _id: false });

const tourSchema = new Schema({
    ru: langTourSubschema,
    en: langTourSubschema,
    images: {
        type: [String]
    },
    dates: [{
        dateFrom: {
            day: {type: Number},
            month: {type: Number},
            year: {type: Number}
        },
        dateTo: {
            day: {type: Number},
            month: {type: Number},
            year: {type: Number}
        }
    }],
    cost: {type: Number},
    discount: {type: Number, default: 0},
    bookedMax: {type: Number},
    booked: {type: Number},
    views: {type: Number}
});

export default  mongoose.model('tours', tourSchema);
