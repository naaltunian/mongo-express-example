const mongoose = require('mongoose');
// mongoose = ORM
// index primary keys used to find those relations
const UserSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    hobbies: [{
        type: String
    }],
    dateAdded: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('User', UserSchema);