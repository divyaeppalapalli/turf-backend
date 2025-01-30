const mongoose = require('mongoose');
const { Schema } = mongoose;
 
const userSchema = new Schema({
    name: String,
    phoneNumber: { type: String, unique: true, required: true, dropDups: true},
    password: String,
    photo: String
});




const User = new mongoose.model('User', userSchema);

module.exports = User;