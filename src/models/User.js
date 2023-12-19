const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    email: { type: String, require: true, unique: true },
    name: { type: String, require: true },
    password: { type: String, require: true },
    active: { type: Boolean, require: false },
})

const User = mongoose.model('User', UserSchema)

module.exports = User