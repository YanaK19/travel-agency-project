import mongoose from 'mongoose'
const Schema = mongoose.Schema;

const rangeSchema = new Schema({
    category: { type: String},
    types: [String]
});

export default mongoose.model('ranges', rangeSchema);