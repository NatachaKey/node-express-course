const express = require('express')
const app = express();
const tasks = require('./routes/tasks')
const connectDB = require('./db/connect')
require('dotenv').config()

//middleware

//what does this line do?
app.use(express.json())
//The app.use() function adds a new middleware to the app. Express.json() is a built in middleware function, it parses incoming JSON requests and puts the parsed data in req.body.
// parse converts json to JavaScript object
//and this object is passed as a req.body


//routes
app.get('/hello', (req, res)=>{
    res.send('Task Manager app')
})

app.use('/api/v1/tasks', tasks)


const port = 3000

const start = async () =>{
    try{
        await connectDB(process.env.MONGO_URI)
        app.listen(port, console.log(`Server is listening on port ${port}...`));
    } catch (error) {
        console.log(error);
        
    }
}

start()







//TASK:
//app.get('/api/v1/tasks') -get all the taskes
//app post('/api/v1/tasks') - create a new task
//app.get('/api/v1/tasks/:id') - get single task
//app.patch('/api/v1/tasks/:id') -update task
//app.delete('/api/v1/tasks/:id') -delete task