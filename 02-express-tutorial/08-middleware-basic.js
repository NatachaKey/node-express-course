const express = require('express')
const app = express()
//const logger = require('./logger')

//  req => middleware => res

// req => middleware => res
//middlewear is everywhere in express
//  user's request comes => middleware are functions that execute during the request to the server , 
// each middleware function has access to request and response => response will do some kind of functionality

//we can also put logget in another file and export it (see logger.js)
const logger = (req, res, next) =>{
    const method = req.method
    const url = req.url
    const time = new Date().getFullYear()
    console.log(method, url, time);
    next()
    // or res.send('Test')
}
    //next it is the third argument that is passed to the middleware function. 
    //named by convention.
    //With next() we pass the whole logic ( in this case as function logger) to the the next middleware function in the app.

//so:
    //WHEN WE WORK WITH MIDDLEWARE WE have 2 options: 
    //1. PASS IT ON TO THE NEXT MIDDLEWARE FUNCTION using next() ((logic that usually includes get methods)) 
    //2. FINISH THE CYCLE BY SENDING BACK A RESPONSE ourselves: res.send('Test')


//logger is a middlewear function in this case

app.use(logger)
//app.use will invoke logger for any route
//first we call .use method, and then all .get methods
//also we can pass another argument(path '/path' to app.use('/api',logger)) 
//so it will pass logger function to all routes that contain '/api' and something after it:
//(in this case '/api/products' and '/api/items')
//if we dont specify the path as an argument- logger will be applied to all get routes

app.get('/', logger, (req, res)=>{
    res.send('Home')
})

app.get('/about', logger, (req, res)=>{
    res.send('About')
})

//in the next two get methods we don´t pass logger as an argument- but  app.use(logger) method will pass it automatically to all get requests
app.get('/api/products', (req, res)=>{
    res.send('Products')
})

app.get('/api/items',  (req, res)=>{
    res.send('Items')
})


app.listen(5000, ()=>{
    console.log('Server is listening on port 5000...')
})