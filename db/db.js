const mongoose = require('mongoose');
const connectionString = process.env.MONGODB_URI || 'mongodb://localhost/travltrakr';
// Database will be called travltrakr
mongoose.connect(connectionString, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false
});

mongoose.connection.on('connected', () => {
  console.log('Mongoose is connected')
});

mongoose.connection.on('error', (err) => {
  console.log(err, ' mongoose failed to connect')
});

mongoose.connection.on('disconnected', () => {
  console.log('Mongoose is disconnected')
});
