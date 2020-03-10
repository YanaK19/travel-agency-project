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
    languages: [String],
    location: {
        country: {type: String, default: ''},
        town: {type: String, default: ''}
    },
    about: {type: String, default: ''},
    subscriptions: [{
        ref: 'users',
        type: Schema.Types.ObjectId
    }],
    favouriteTourIds: [{
        ref: 'tours',
        type: Schema.Types.ObjectId
    }],
    role: {
        type: String,
        default: 'customer'
    },
    avatar: {
        type: String,
        default: ''
    }
});

export default mongoose.model('users', userSchema);
