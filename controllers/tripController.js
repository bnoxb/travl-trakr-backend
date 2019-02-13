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
		location: `${foundTrip.name},${foundTrip.state},${foundTrip.country}`,
		attributes: 'hot_and_new'
	};
	console.log(foundTrip);
	const client = yelp.client(process.env.yelpKey);

	client.search(searchRequest).then(response => {
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

router.put('/:id/addNote', async (req, res) => {
	try {
	    const foundTrip = await Trip.findById(req.params.id);
	    const foundUser = await User.findOne({'trips._id': req.params.id});
	    foundTrip.notes.push(req.body.note);
	    await foundTrip.save();
	    foundUser.trips.id(req.params.id).remove();
	    foundUser.trips.push(foundTrip);
	    await foundUser.save();
	    res.json({
	    	status:200,
	    	data: foundTrip
	    })
	} catch (err) {
	    res.send(err)
	}
});

router.put('/:id', async (req, res) => {
	try {
		const updatedTrip = await Trip.findByIdAndUpdate(req.params.id, req.body, {new: true});
		const foundUser = await User.findOne({'trips._id': req.params.id});
		foundUser.trips.id(req.params.id).remove();
		foundUser.trips.push(updatedTrip);
		const data = await foundUser.save();
		res.json({
			status: 200,
			data: updatedTrip
		});
	} catch(err) {
		res.send(err)
	}
});

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