import mongoose from 'mongoose'
const Schema = mongoose.Schema;

const newsletterSchema = new Schema({
    emails: [String]
});

export default mongoose.model('news', newsletterSchema);
