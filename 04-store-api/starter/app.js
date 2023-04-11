require('dotenv').config();
//need to install this npm package (express-async-errors)
//we use it instead of setting try catch blocks for every controller, and instead of setting our own middleware(like asyncWrapper in 03-task-manager)
require('express-async-errors')

const express = require('express');
const app = express();

const connectDB = require('./db/connect')

//import router
const productsRouter = require('./routes/products')

const notFoundMiddleware = require('./middleware/not-found');
const errorMiddleware = require('./middleware/error-handler');

//middleware app.use(express.json()) parses incoming JSON requests and puts the parsed data in req.body.

app.use(express.json());

//routes

app.get('/', (req, res) => {
  res.send('<h1> Store api </h1> <a href="/api/v1/products"> route products </a>');
});
//router
//here we pass in our imported router productsRouter
app.use('/api/v1/products', productsRouter )

//products route
app.use(notFoundMiddleware);
app.use(errorMiddleware);

const port = process.env.PORT || 3000;

const start = async () => {
  try {
    // connect DB
    await connectDB(process.env.MONGO_URI)

    app.listen(port, console.log(`Server is listening on port ${port}...`));
  } catch (error) {
    console.log(error);
  }
};

start();
