const mongoose = require('mongoose');
const { Schema } = mongoose;

const timeSlotSchema = new Schema({
    date: String,
    startTime: String,
    endTime: String,
    isBooked: { type: Boolean, default: false },
});

const TimeSlot = new mongoose.model('TimeSlot', timeSlotSchema);

module.exports = TimeSlot;