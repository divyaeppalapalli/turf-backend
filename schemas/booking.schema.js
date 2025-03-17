const mongoose = require('mongoose');
const { Schema } = mongoose;

const bookingSchema = new Schema({
<<<<<<< HEAD
    turf: { type: mongoose.Schema.Types.ObjectId, ref: 'Turf' },
    slot: { type: mongoose.Schema.Types.ObjectId, ref: 'TimeSlot' },
    price: {
        type: Number,
        default: 600.00
    }
}, {
    timestamps: true
=======
    date: Date,
    turf: {type: mongoose.Schema.Types.ObjectId, ref: 'Turf'}
     
>>>>>>> d3192877ac5b713d80000b551226bd2674392763
});


const Booking = new mongoose.model('Booking', bookingSchema);

module.exports = Booking;