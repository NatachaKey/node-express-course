const Task = require('../models/Task');

const getAllTasks = (req, res) => {
  res.send('get all tasks from the file');
};

const createTask = async (req, res) => {
  const task = await Task.create(req.body);
  res.status(201).json({ task });
  //server sends us back  the body with the data provided by user in json format () in this case "name": "shake",
  //"completed": true
};

const getTask = (req, res) => {
  //server sends us back the body with the id provided by user in json format
  res.json({ id: req.params.id });
};

const updateTask = (req, res) => {
  res.send('update task');
};

const deleteTask = (req, res) => {
  res.send('delete task');
};

module.exports = {
  getAllTasks,
  createTask,
  getTask,
  updateTask,
  deleteTask,
};
