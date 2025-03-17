const mongoose = require('mongoose');
const { Schema } = mongoose;

const turfSchema = new Schema({
    name: String,
    location: String,
    thumbnail: String,
    images: [String],
    address: String,
    contact: String,
    note: String,
});

const Turf = new mongoose.model('Turf', turfSchema);

module.exports = Turf;