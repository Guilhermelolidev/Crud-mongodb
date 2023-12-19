const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const PictureSchema = new Schema({
    name: { type: String, require: true },
    src: { type: String, require: true },
    id_user: { type: String, require: true }
})

const Picture = mongoose.model('Picture', PictureSchema)

module.exports = Picture