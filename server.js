require('dotenv').config();
const express			= require('express');
const app				= express();
const bodyParser		= require('body-parser');
const cors				= require('cors');
const session			= require('express-session');
const User 				= require('./models/user');
const Trip 				= require('./models/trip');

require('./db/db');


app.use(session({
	secret: process.env.secret,
	resave: false,
	saveUninitialied: false
}));


app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());


const corsOptions = {
  origin: process.env.origin,
  credentials: true,
  optionsSuccessStatus: 200
}
app.use(cors(corsOptions));



const userController		= require('./controllers/userController');
const tripController		= require('./controllers/tripController');
const authController		= require('./controllers/authController');


app.use('/api/v1/users', userController);
app.use('/api/v1/trips', tripController);
app.use('/api/v1/auth', authController);




app.listen(process.env.PORT, () => {
  console.log(`listening on port`);
});
