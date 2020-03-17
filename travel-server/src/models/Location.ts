import mongoose from 'mongoose'
const Schema = mongoose.Schema;

const langLocSubschema = new Schema({
    country: { type: String},
    towns: [String]
}, { _id: false });

const locationSchema = new Schema({
    ru: langLocSubschema,
    en: langLocSubschema
});

export default mongoose.model('locations', locationSchema);
