var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var User = require('../models/user');
var schema = new Schema({
    description: {
        type: String,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
});
// after deleting the task from the users table remove it from the user users array
schema.post('remove', function(task){
    var deletedTask = task;
    User.findById(task.user, function (err, user) {
        user.tasks.pull(deletedTask);
        user.save();
    });
});

module.exports = mongoose.model('Task', schema);