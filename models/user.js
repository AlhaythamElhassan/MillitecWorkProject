var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var mongooseUniqueValidator = require('mongoose-unique-validator');
var bcrypt = require('bcrypt');
var myValidator = require('validator');
var jwt = require('jsonwebtoken');

var schema = new Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    salt:{
        type: String
    },
    hash_password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: function (value) {
                return myValidator.isEmail(value);
            }
        }
    },
    role: { // this can be in a separate table and connected to the user
        type: String,
        required: true
    },
    tasks: [{
        type: Schema.Types.ObjectId,
        ref: 'Task'
    }]
});

schema.plugin(mongooseUniqueValidator);

schema.method('setPassword', function(value) {
    var salt = bcrypt.genSaltSync(10); // generate salt
    var hashedPassword = bcrypt.hashSync(value, salt); // create hash password
    this.set('salt', salt);
    this.set('hash_password', hashedPassword);
});

schema.virtual('password').set(function(password){
    this.setPassword(password);
    this._password = password;
}).get(function(){
    return this._password;
});

schema.statics.authenticate = function (requestBody, callback) {
        if (!myValidator.isEmail(requestBody.email) || typeof requestBody.password !== 'string') {
            callback(error, null);
        }
        this.findOne({email: requestBody.email}, function (err, user) {
            if (err) {
                error = new Error("Internal server error");
                return callback (error, null);
            }
                if (!user || !bcrypt.compareSync(requestBody.password, user.get('hash_password'))) {
                    error = new Error("Your email address or password is invalid. Please try again.");
                    return callback (error, null);
                }
            callback(null, user);
        });
};
var user = mongoose.model('User', schema);
module.exports = user;
