const express = require('express');
const router = express.Router();
const User = require('../models/user');
const Trip = require('../models/trip')


router.post('/', async(req, res) => {
	try {
		const newTrip = await Trip.create(req.body);
		const foundUser = await User.findById(req.session._id);
		foundUser.trips.push(newTrip);
		await foundUser.save()
		res.json({
			status: 200,
			data: foundUser
		})
	} catch(err) {
		console.log(err);
		res.send(err);
	}
})

router.get('/:id', async(req, res) => {
	try{ 
		const foundTrip = await Trip.findById(req.params.id);
		res.json({
			status: 200,
			data: foundTrip
		})
	} catch(err) {
		console.log(err);
		res.send(err);
	}
})
















module.exports = router;