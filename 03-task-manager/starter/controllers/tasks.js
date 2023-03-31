const Task = require('../models/Task');
const asyncWrapper = require('../middleware/async');
const { createCustomError } = require('../errors/custom-errors');

//we pass req, res to asyncWrapper
const getAllTasks = asyncWrapper(async (req, res) => {
  const tasks = await Task.find({});

  //Options for response:
  res.status(200).json({ tasks });
  //or tasks: tasks

  // res.status(200).json({ tasks, amount : tasks.length })

  //  res.status(200).json({ success: true, data: {tasks, numberOfHits : tasks.length} })

  //res
  // .status(200)
  // .json({ status: "success", data: {tasks, numberOfHits : tasks.length} })
  //with this las vestion we should change line 11 in public/browser.app.js : data: { data: {tasks} },
});

const createTask = asyncWrapper(async (req, res) => {
  const task = await Task.create(req.body);
  res.status(201).json({ task });
});

//server sends us back  the body with the data (provided by user) in json format () in this case "name": "shake",
//"completed": true...etc.
//here we have 2 errors- the 1st one if for cases when there is no such id, the 2nd- for syntax errors (lack of 1-2 characters, etc)
const getTask = asyncWrapper(async (req, res, next) => {
  const { id: taskID } = req.params;
  const task = await Task.findOne({ _id: taskID });
  if (!task) {
    return next(createCustomError(`No task with id : ${taskID}`, 404));
  }
  res.status(200).json({ task });
});

const updateTask = asyncWrapper(async (req, res) => {
  const { id: taskID } = req.params;

  const task = await Task.findOneAndUpdate({ _id: taskID }, req.body, {
    new: true,
    runValidators: true,
  });
  //new:true will always create a new task
  //we apply validators-
  if (!task) {
    return next(createCustomError(`No task with id : ${taskID}`, 404));
  }
  res.status(200).json({ task });
});

const deleteTask = asyncWrapper(async (req, res) => {
  const { id: taskID } = req.params;
  const task = await Task.findOneAndDelete({ _id: taskID });
  if (!task) {
    return next(createCustomError(`No task with id : ${taskID}`, 404));
  }
  //Types of respose we can get:
  res.status(200).json({ task });
  //res.status(200).send() or
  //res.status(200).json({task : null , status : 'success'})
});

module.exports = {
  getAllTasks,
  createTask,
  getTask,
  updateTask,
  deleteTask,
};

// //version without refactoring
// const Task = require('../models/Task');

// const getAllTasks = async (req, res) => {
//   try {
//     const tasks = await Task.find({})
//     //Options for response:
//     res.status(200).json({ tasks })
//     //or tasks: tasks

//    // res.status(200).json({ tasks, amount : tasks.length })

//   //  res.status(200).json({ success: true, data: {tasks, numberOfHits : tasks.length} })

//   //res
//   // .status(200)
//   // .json({ status: "success", data: {tasks, numberOfHits : tasks.length} })
//   //with this las vestion we should change line 11 in public/browser.app.js : data: { data: {tasks} },

//   } catch(error) {
//     res.status(500).json({ msg: error })
//   }
// };

// const createTask = async (req, res) => {
//   try {
//   const task = await Task.create(req.body);
//   res.status(201).json({ task });
// } catch(error) {
//     res.status(500).json({ msg: error })
//     }
//   }
//    //server sends us back  the body with the data (provided by user) in json format () in this case "name": "shake",
//   //"completed": true...etc.
//   //here we have 2 errors- the 1st one if for cases when there is no such id, the 2nd- for syntax errors (lack of 1-2 characters, etc)
// const getTask =  async (req, res) => {
//   try {
//     const { id : taskID } = req.params
//     const task = await Task.findOne({ _id: taskID})
//     if(!task){
//       return res.status(404).json({msg: `No task with id : ${taskID}`})
//     }

//     res.status(200).json({ task})
//   } catch(error) {
//     res.status(500).json({ msg: error })
//   }
//   };

// const updateTask = async (req, res) => {
//   try {
//     const { id: taskID} = req.params;

//     const task = await Task.findOneAndUpdate({_id:taskID}, req.body, {new: true,runValidators: true})
//     //new:true will always create a new task
//     //we apply validators-
//     if(!task){
//       return res.status(404).json({msg: `No task with id : ${taskID}`})
//     }

//     res.status(200).json({ task })
//   } catch(error) {
//     res.status(500).json({ msg: error })
//     }

// };

// const deleteTask = async (req, res) => {
//   try {
//     const { id : taskID } = req.params;
//     const task = await Task.findOneAndDelete({ _id: taskID})
//     if(!task){
//       return res.status(404).json({msg: `No task with id : ${taskID}`})
//     }
//     //Types of respose we can get:
//     res.status(200).json({task})
//     //res.status(200).send() or
//     //res.status(200).json({task : null , status : 'success'})
//     } catch(error) {
//     res.status(500).json({ msg: error })
//     }

// };

// module.exports = {
//   getAllTasks,
//   createTask,
//   getTask,
//   updateTask,
//   deleteTask,
// };
