const express = require('express');
const router = express.Router();
const User = require('../models/user');
const Trip = require('../models/trip');
const yelp = require('yelp-fusion');


router.post('/', async(req, res) => {
	try {
		const newTrip = await Trip.create(req.body);
		const foundUser = await User.findById(req.session._id);
		foundUser.trips.push(newTrip);
		await foundUser.save()
		res.json({
			status: 200,
			data: {
				message: 'created successfully',
				user: foundUser
			}
		})
	} catch(err) {
		console.log(err);
		res.send(err);
	}
})


router.get('/yelp/:id', async (req, res) => {
	const foundTrip = await Trip.findById(req.params.id);
	const searchRequest = {
		location: foundTrip.name,
		attributes: 'hot_and_new'
	};
	console.log(foundTrip);
	const client = yelp.client('DXtElh5EDH3h6uff8IZFr_iQDaAgkwqNQAKYCHo2aj8MrD0gZ__8cdvU6Md2da_gz1asTph1FJ70oLk0UnugdW2iHb7r8c8DSGbPaQSDmNEiS52wDqVOwc31OIhdXHYx');

	client.search(searchRequest).then(response => {
		// const firstResult = response.jsonBody.businesses[0];
		// const prettyJson = JSON.stringify(firstResult, null, 4);
		res.json({
			status: 200,
			data: response
		})
	}).catch(e => {
		console.log(e);
	});
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


router.delete('/:id', async (req, res) => {
	try {
		const userWithTrip = await User.findOne({'trips._id': req.params.id});
		userWithTrip.trips.id(req.params.id).remove();
		await userWithTrip.save();
		const deletedTrip = await Trip.findByIdAndRemove(req.params.id);
		res.json({
			status: 200,
			data: deletedTrip
		});
	}catch(err){
		res.send(err);
	}
});














module.exports = router;