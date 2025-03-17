const mongoose = require('mongoose');
const { Schema } = mongoose;

const bookingSchema = new Schema({
    turf: { type: mongoose.Schema.Types.ObjectId, ref: 'Turf' },
    slot: { type: mongoose.Schema.Types.ObjectId, ref: 'TimeSlot' },
    price: {
        type: Number,
        default: 600.00
    }
}, {
    timestamps: true
});

const Booking = new mongoose.model('Booking', bookingSchema);

module.exports = Booking;