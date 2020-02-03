import mongoose from 'mongoose'
const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    telephone: {
        type: String
    },
    favouriteTourIds: {
        ref: 'tours',
        type: Schema.Types.ObjectId
    },
    bookedTourIds: {
        ref: 'tours',
        type: Schema.Types.ObjectId
    },
    role: {
        type: String,
        default: 'customer'
    }
});

export default mongoose.model('users', userSchema);