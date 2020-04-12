import mongoose from 'mongoose'
const Schema = mongoose.Schema;

const messageSchema = new Schema({
    firstName: String,
    lastName: String,
    email: String,
    mobile: String,
    message: String,
    date: {
        day: {type: Number},
        month: {type: Number},
        year: {type: Number}
    },
    answered: Boolean
});

export default mongoose.model('messages', messageSchema);
