const mongoose = require('mongoose');

const Todo = new mongoose.Schema({
  todo: {
    type: String
  },
  completed: {
    type: Boolean
  }
});

module.exports = mongoose.model('Todo', Todo);