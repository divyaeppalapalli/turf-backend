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
const Turf = require('./schemas/turf.schema');

app.get('/', (req, res) => {
    res.send('welcome to first API request');
});

app.post('/login', async (req, res) => {
    const body = req.body;
    const { phoneNumber, password } = body;
    console.log('login backend: ', body);
    
    const user = await UserModel.findOne({phoneNumber: phoneNumber, password: password});
    if(user) {
        res.send(user);
    } else {
        res.send('No User found with phoneNumber: ' + phoneNumber);
    }
});

app.post('/createUser', async (req, res) => {
    const body = req.body;

    const user = new UserModel(body);
    const saved = await user.save();
    console.log('saved user ', saved);
    
    res.send(saved);
})

// Creates a turf
app.post('/createTurf', async (req, res) => {
    const body = req.body;
    const turf = new Turf(body);
    const saved = await turf.save(); 

    res.send(saved);
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

app.post('/createBooking', async (req, res) => {
    const body = req.body;
    const booking = new BookingModel(body);
    const saved = await booking.save();

    res.send(saved);
});

app.get('**', (req, res) => {
    res.send("Route Not Found...");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});