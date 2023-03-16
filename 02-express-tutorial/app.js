const express = require('express')
const app = express()

// req => middleware => res
//middlewear is everywhere in express
//  user's request comes => middleware are functions that execute during the request to the server , 
// each middleware function has access to request and response => response will do some king of functionality

app.listen(5000, ()=>{
    console.log('Server is listening on port 5000...')
})