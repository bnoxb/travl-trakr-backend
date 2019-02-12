const mongoose	= require('mongoose');


const tripSchema = new mongoose.Schema({
	name: String,
	state: String,
	country: String,
	dateArrived: Date,
	dateLeft: Date,
	notes: [String]
});






module.exports = mongoose.model('Trip', tripSchema);