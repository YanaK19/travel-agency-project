import mongoose from 'mongoose'
const Schema = mongoose.Schema;

const tourSchema = new Schema({
    title: {type: String},
    restType: {type: [String]},
    transportType: {type: String},
    cost: {type: Number},
    route: {
        fromCountry: {type: String},
        fromTown: {type: String},
        toCountry: {type: String},
        toTown: {type: String}
    },
    moreInfo: {type: String},
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
    discount: {type: Number, default: 0},
    bookedMax: {type: Number},
    booked: {type: Number},
    views: {type: Number}
});

export default  mongoose.model('tours', tourSchema);
