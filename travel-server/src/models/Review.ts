import mongoose from 'mongoose'
const Schema = mongoose.Schema;

const reviewSchema = new Schema({
    title: {type: String},
    info: {type: String},
    img: {type: String},
    confirmed: {type: Boolean},
    userId: {
        ref: 'users',
        type: Schema.Types.ObjectId
    }
});

export default mongoose.model('reviews', reviewSchema);
