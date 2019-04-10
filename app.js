const express = require('express');
const mongoose = require('mongoose');
const bodyparser = require('body-parser');

const app = express();

// Connect to database
mongoose.connect('Your Custom MongoDB URL', {
    useNewUrlParser: true
  })
  .then(() => {
    console.log('MongoDB Conected');
  })
  .catch((err) => {
    console.log(err)
  });

// EJS / Template engine
app.set('view engine', 'ejs');

// Bodyparser
app.use(bodyparser.urlencoded({
  extended: true
}));
app.use(bodyparser.json());

// Routes
app.use('/', require('./routes/index'));
app.use('/todo', require('./routes/todo'));

// Listen to port
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`)
});