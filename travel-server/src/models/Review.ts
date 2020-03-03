import mongoose from 'mongoose'
const Schema = mongoose.Schema;

const reviewSchema = new Schema({
    title: {type: String},
    info: {type: String},
    img: {type: String},
    date: {
        day: {type: Number},
        month: {type: Number},
        year: {type: Number}
    },
    confirmed: {type: Boolean},
    userId: {
        ref: 'users',
        type: Schema.Types.ObjectId
    },
    tourId: {
        ref: 'tours',
        type: Schema.Types.ObjectId
    }
});

export default mongoose.model('reviews', reviewSchema);
