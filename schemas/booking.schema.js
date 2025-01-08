const mongoose = require('mongoose');
const { Schema } = mongoose;

const bookingSchema = new Schema({
    date: Date,
    turf: {type: mongoose.Schema.Types.ObjectId, ref: 'Turf'}
});

const Booking = new mongoose.model('Booking', bookingSchema);

module.exports = Booking;