const express			= require('express');
const app				= express();
const bodyParser		= require('body-parser');
const cors				= require('cors');
const session			= require('express-session');
const User 				= require('./models/user');
const Trip 				= require('./models/trip');

require('./db/db');


app.use(session({
	secret: 'i like to travel',
	resave: false,
	saveUninitialied: false
}));


app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());


const corsOptions = {
  origin: 'http://localhost:3000',
  credentials: true,
  optionsSuccessStatus: 200
}
app.use(cors(corsOptions));



const userController		= require('./controllers/userController');
const tripController		= require('./controllers/tripController');


app.use('/api/v1/users', userController);
app.use('/trips', tripController);




app.listen(process.env.PORT || 9000, () => {
  console.log('listening on port 9000');
});
