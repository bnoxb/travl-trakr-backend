const mongoose	= require('mongoose');


const tripSchema = new mongoose.Schema({
	name: String,
	country: String,
	dateArrived: Date,
	dateLeft: Date,
	Notes: [String]
});







module.exports = mongoose.model('Trip', tripSchema);