import mongoose from 'mongoose'
const Schema = mongoose.Schema;

const orderSchema = new Schema({
    userId: {
        ref: 'users',
        type: Schema.Types.ObjectId
    },
    tourId: {
        ref: 'tours',
        type: Schema.Types.ObjectId
    },
    cost: { type: Number},
    peopleNumber: { type: Number},
    date: {
        day: {type: Number},
        month: {type: Number},
        year: {type: Number}
    },
    tourDate: {
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
    },
    confirmed: {
        type: Boolean
    }
});

export default mongoose.model('orders', orderSchema);
