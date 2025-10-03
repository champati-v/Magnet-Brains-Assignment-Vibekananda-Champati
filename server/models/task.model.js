const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const taskSchema = new Schema({
    title: {type: String, required: true},
    description: {type: String, required: true},
    status: {type: String, enum: ['pending', 'in-progress', 'completed'], default: 'pending'},
    priority: {type: String, enum: ['low', 'medium', 'high'], default: 'low'},
    dueDate: {type: Date},
    userId: {type: String, required: true},
    createdOn : { type: Date, default: new Date().getTime() }
});

module.exports = mongoose.model('Task', taskSchema);