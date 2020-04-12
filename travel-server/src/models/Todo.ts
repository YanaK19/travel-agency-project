import mongoose from 'mongoose'
const Schema = mongoose.Schema;

const todoListSchema = new Schema({
    task: String,
    done: Boolean
});

export default mongoose.model('todos', todoListSchema);
