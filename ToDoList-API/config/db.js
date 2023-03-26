const mongoose = require('mongoose');

mongoose.set('useCreateIndex', true);
mongoose.connect(`${process.env.DB_CONNECTION_STRING}`, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connection.on('error', (err) => console.log('Error while connecting to MongoDB', err));
mongoose.connection.once('open', () => console.log('Connected To MongoDB!'));
