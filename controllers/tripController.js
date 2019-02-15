const express = require('express');
const router = express.Router();
const User = require('../models/user');
const Trip = require('../models/trip');
const yelp = require('yelp-fusion');

// Create a new trip. Trips are specific to the perosn making them.
router.post('/', async(req, res) => {
	try {
		const newTrip = await Trip.create(req.body);
		const foundUser = await User.findById(req.session._id);
		foundUser.trips.push(newTrip);
		await foundUser.save()
		res.json({
			status: 201,
			data: {
				message: 'created successfully',
				user: foundUser
			}
		})
	} catch(err) {
		console.log(err);
		res.json({
			status: 400,
			data: {
				message: 'Something broke'
			}
		});

	}
})

// This path retrieves the information from yelp using a node 'yelp-fusion': HOT AND NEW.
router.get('/yelp/:id/hot_and_new', async (req, res) => {
	try {
		const foundTrip = await Trip.findById(req.params.id);
		const searchRequest = {
			location: `${foundTrip.name},${foundTrip.state},${foundTrip.country}`,
			// Changing these attributes would change what types of places are returned.
			attributes: 'hot_and_new'
		};
		const client = yelp.client(process.env.yelpKey);
		const response = await client.search(searchRequest);
			res.json({
				status: 200,
				data: response
			})
	} catch(err) {
		console.log(err);
		res.json({
			status: 400,
			data: err
		})
	}
})


// This path retrieves the information from yelp using a node 'yelp-fusion': SORTS BY REVIEW COUNT.
router.get('/yelp/:id/most_reviewed', async (req, res) => {
	try {
		const foundTrip = await Trip.findById(req.params.id);
		const searchRequest = {
			location: `${foundTrip.name},${foundTrip.state},${foundTrip.country}`,
			// Changing these attributes would change what types of places are returned.
			sort_by: 'review_count'
		};
		const client = yelp.client(process.env.yelpKey);
		const response = await client.search(searchRequest);
			res.json({
				status: 200,
				data: response
			})
	} catch(err) {
		console.log(err);
		res.json({
			status: 400,
			data: err
		})
	}
})


// This path retrieves the information from yelp using a node 'yelp-fusion': BEST MATCH.
router.get('/yelp/:id/best_match', async (req, res) => {
	try {
		const foundTrip = await Trip.findById(req.params.id);
		const searchRequest = {
			location: `${foundTrip.name},${foundTrip.state},${foundTrip.country}`,
			// Changing these attributes would change what types of places are returned.
			sort_by: 'best_match'
		};
		const client = yelp.client(process.env.yelpKey);
		const response = await client.search(searchRequest);
			res.json({
				status: 200,
				data: response
			})
	} catch(err) {
		console.log(err);
		res.json({
			status: 400,
			data: err
		})
	}
})




// Show a specific trip
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

// Add a note to the trip. Notes are contained in an array inside the trip. This pushes the new note in.
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
			status:201,
			data: foundTrip
		})
	} catch (err) {
		res.send(err)
	}
});

// Remove a note
router.put('/:id/deleteNote', async (req, res) => {
	try {
		const foundTrip = await Trip.findById(req.params.id);
		const foundUser = await User.findOne({'trips._id': req.params.id});
		foundTrip.notes = req.body;
		await foundTrip.save();
		foundUser.trips.id(req.params.id).remove();
		foundUser.trips.push(foundTrip);
		await foundUser.save();
		res.json({
			status:201,
			data: foundTrip
		})
	} catch (err) {
		res.send(err)
	}
});

// Updates the trip information. Since trips are specific to users, the user is also updated.
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

// Delete the trip, and remove it from the User
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