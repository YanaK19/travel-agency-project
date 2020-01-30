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
        type: String
    },
    confirmed: {
        type: Boolean
    }
});

export default mongoose.model('reviews', orderSchema);