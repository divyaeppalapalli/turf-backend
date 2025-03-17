const express = require('express');
const app = express();
const bodyParser = require('body-parser');

// mongoose connection...
const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://eppalpellidivya:khzsDK6ieuhxcbEW@cluster0.nrvh2.mongodb.net/turf-db?retryWrites=true&w=majority&appName=Cluster0')
    .then(() => console.log('DB Connected!...')).catch(err => console.log('DB Connection Error: ', err));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded())

// parse application/json
app.use(bodyParser.json())

const UserModel = require('./schemas/user.schema');
const BookingModel = require('./schemas/booking.schema');
const TimeSlotModel = require('./schemas/timeslot.schema');
const Turf = require('./schemas/turf.schema');

app.get('/', (req, res) => {
    res.send('welcome to first API request');
});

app.post('/login', async (req, res) => {
    const body = req.body;
    const { phoneNumber, password } = body;
    console.log('login backend: ', body);

    const user = await UserModel.findOne({ phoneNumber: phoneNumber, password: password });
    if (user) {
        res.send(user);
    } else {
        res.status(404).send('No User found with phoneNumber: ' + phoneNumber);
    }
});

app.post('/createUser', async (req, res) => {
    const body = req.body;

    const user = new UserModel(body);
    const saved = await user.save();
    console.log('saved user ', saved);

    res.send(saved);
});

app.get('/user/:userId', async (req, res) => {
    const userId = req.params.userId;
    UserModel.findById(userId)
        .then(user => {
            res.status(200).json(user);
        });
});

// Creates a turf
app.post('/createTurf', async (req, res) => {
    const body = req.body;
    const turf = new Turf(body);
    const saved = await turf.save();

    res.status(201).send(saved);
});

// Get the list of all the turfs
app.get('/turfs', async (req, res) => {
    const turfs = await Turf.find();

    res.send(turfs);
});

app.get('/turf/:turfId', async (req, res) => {
    const turfId = req.params.turfId;
    Turf.findById(turfId)
        .then(turf => {
            res.status(200).json(turf);
        });
});

// API to create a timeslot for the day
app.post('/timeslot', async (req, res) => {
    const body = req.body;

    const timeSlot = new TimeSlotModel(body);
    await timeSlot.save();
    res.status(201).send(timeSlot);
});

app.get('/timeslot/:date', async (req, res) => {
    const date = req.params.date;
    const timeSlots = await TimeSlotModel.find({ date: date });

    res.send(timeSlots);
});

// create a booking
app.post('/bookings', async (req, res) => {
    try {
        const body = req.body;
        const booking = new BookingModel(body);

        // Find the slot and update it to booked
        const slot = await TimeSlotModel.findById(booking.slot);
        if (!slot) {
            return res.status(404).send({ error: "Slot not found" });
        }
        slot.isBooked = true;
        await slot.save();

        // Save the booking
        const saved = await booking.save();

        // Populate the slot field
        const populated = await BookingModel.findById(saved._id).populate('slot');

        res.send(populated);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});

// Get all bookings
app.get('/bookings', async (req, res) => {
    const bookings = await BookingModel.find().populate('slot turf');

    res.send(bookings);
});

app.get('**', (req, res) => {
    res.send("Route Not Found...");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});