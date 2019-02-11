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
	console.log(foundTrip, 'foundtrip');
	const searchRequest = {
		location: foundTrip.name,
		attributes: 'hot_and_new'
	};

	const client = yelp.client('DXtElh5EDH3h6uff8IZFr_iQDaAgkwqNQAKYCHo2aj8MrD0gZ__8cdvU6Md2da_gz1asTph1FJ70oLk0UnugdW2iHb7r8c8DSGbPaQSDmNEiS52wDqVOwc31OIhdXHYx');

	client.search(searchRequest).then(response => {
		// const firstResult = response.jsonBody.businesses[0];
		// const prettyJson = JSON.stringify(firstResult, null, 4);
		console.log(response, ' responsesseses');
		res.json({
			status: 200,
			data: response
		})
	}).catch(e => {
		console.log(e);
	});
	// try{
	// 	const yelpResponse = await fetch (`https://api.yelp.com/v3/businesses/search?location=${foundTrip.name}&attributes=hot_and_new`, {
	// 		headers: {
	// 			'Authorization': 'Bearer DXtElh5EDH3h6uff8IZFr_iQDaAgkwqNQAKYCHo2aj8MrD0gZ__8cdvU6Md2da_gz1asTph1FJ70oLk0UnugdW2iHb7r8c8DSGbPaQSDmNEiS52wDqVOwc31OIhdXHYx'
	// 		}
	// 	})
	// 	console.log(yelpResponse, ' yelpresponse');
	// 	res.json({
	// 		status: 200,
	// 		data: yelpResponse
	// 	})
	// } catch(err) {
	// 	res.send(err)
	// }
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