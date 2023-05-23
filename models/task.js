const mongoose = require('mongoose');
const schema = mongoose.Schema;

const taskSchema = new schema({
    title: {
        type: String,
        require: true
    },
    category: {
        type: String,
        require: true
    },
    priority: {
        type: String,
        require: true
    },
    due_date: {
        type: Date,
        require: true
    },
    due_time: {
        type: String,
        require: true
    },
    note: {
        type: String
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        require: true
    }
}, {
    timestamps: true
});

const Task = mongoose.model('Task', taskSchema);
module.exports = Task;
