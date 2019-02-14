const mongoose	= require('mongoose');

const Trip		= require('./trip');

const userSchema = new mongoose.Schema({
	// The unique trait is not working. Workaround made in the authcontroller.
	username: { type: String, required: true, unique: true },
	email: String,
	password: String,
	trips: [Trip.schema]
});


module.exports = mongoose.model('User', userSchema);