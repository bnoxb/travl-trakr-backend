const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const bcrypt = require('bcryptjs');
const User = require('../models/user');
const Trip = require('../models/trip');


router.get('/:id', async (req, res) => {
	try {
		const foundUser = await User.findById(req.params.id);
		const currentUser = await User.findOne({username: req.session.username});
		res.json({
			status: 200,
			data: foundUser
		})

	} catch(err) {
		console.log(err);
		res.send(err);
	}
});




















module.exports = router;