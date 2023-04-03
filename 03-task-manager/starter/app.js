const express = require('express');
const app = express();
const tasks = require('./routes/tasks');
const connectDB = require('./db/connect');
require('dotenv').config();
const notFound = require('./middleware/not-found');
const errorHandlerMiddlware = require('./middleware/error-handler');

//middleware

app.use(express.static('./public'));
app.use(express.json());
//The app.use() function adds a new middleware to the app.
//Express.json() is a built in middleware function, it parses incoming JSON requests and puts the parsed data in req.body.
// parse converts json to JavaScript object
//and this object is passed as a req.body

//routes for the tasks

app.use('/api/v1/tasks', tasks);

//custom not found error
app.use(notFound);

//custom error handler in express
app.use(errorHandlerMiddlware);

const port = process.env.PORT || 3000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, console.log(`Server is listening on port ${port}...`));
  } catch (error) {
    console.log(error);
  }
};

start();
