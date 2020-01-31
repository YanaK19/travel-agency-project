import mongoose from 'mongoose'
const Schema = mongoose.Schema;

const locationSchema = new Schema({
    country: { type: String},
    towns: [String]
});

export default mongoose.model('locations', locationSchema);