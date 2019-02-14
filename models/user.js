const mongoose	= require('mongoose');

const Trip		= require('./trip');

const userSchema = new mongoose.Schema({
	username: { type: String, required: true, unique: true },
	email: String,
	password: String,
	trips: [Trip.schema]
});


module.exports = mongoose.model('User', userSchema);