import mongoose from 'mongoose'
const Schema = mongoose.Schema;

const langRangeSubschema = new Schema({
    category: { type: String},
    types: [String]
});

const rangeSchema = new Schema({
    ru: langRangeSubschema,
    en: langRangeSubschema
});

export default mongoose.model('ranges', rangeSchema);
