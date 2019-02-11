const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const bcrypt = require('bcryptjs');
const User = require('../models/user');
const Trip = require('../models/trip');


router.post('/', async (req, res) => {
		const hashedUserPassword = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10));
		const userPassEntry = {};
		userPassEntry.password = hashedUserPassword;
		userPassEntry.username = req.body.username;
		userPassEntry.email = req.body.email;
	try {
		const newUser = await User.create(userPassEntry);
		req.session.loggedIn = true;
		req.session._id = newUser._id;
		req.session.username = newUser.username;

		res.json({
			status: 200,
			data: 'user creation successful'
		})
	} catch(err) {
		console.log(err);
		res.send(err);
	}
})

router.post('/login', async (req, res) => {
	try {
		const returnUser = await User.findOne({ username: req.body.username });
		if (bcrypt.compareSync(req.body.password, returnUser.password)) {
			req.session._id = returnUser._id;
			req.session.username = returnUser.username;
			req.session.loggedIn = true;

			res.json({
				status: 200,
				data: 'login successful'
			})
		}
	} catch(err) {
		console.log(err);
		res.send(err);
	}
});


module.exports = router;