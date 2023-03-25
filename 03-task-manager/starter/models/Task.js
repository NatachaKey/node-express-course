const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
  //set up structure for the data
  name: String,
  completed: Boolean,
  //only this properties will be passed to a database, evrth else will be ignored
});

module.exports = mongoose.model('Task', TaskSchema);
