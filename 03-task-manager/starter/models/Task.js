const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
 
  //set up structure for the data
  // with validation:
 name: {
  type: String,
  required: [true, 'must provide a name'],
  trim: true,
  maxlength: [20, 'name can not be more than 20 characters']
 },
  completed: {
    type: Boolean,
    default: false,
  }
 
});
 //only this properties will be passed to a database, evrth else will be ignored
module.exports = mongoose.model('Task', TaskSchema);
