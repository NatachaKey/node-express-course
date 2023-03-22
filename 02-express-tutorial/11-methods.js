const express = require('express');
const app = express();
let { people } = require('./data');

//setting up STATIC ASSETS (html, css, javascript files from methods-public directory)
app.use(express.static('./methods-public'))
//in methods-public-index.html we have <form action="/login" method="POST">
//action attribute tells us where the user will send his data

//PARSE FORM DATA
//this is a built-in middleware function, it parses incoming requests with urlencoded payloads and is based on body parser
app.use(express.urlencoded({ extended: false}))

//PARSE JSON
app.use(express.json())

// GET -default http method that browser performs
app.get('/api/people', (req, res) => {
  res.status(200).json({ success: true, data: people });
});

//POST
app.post('/api/people', (req, res)=>{
  const { name } = req.body
  if(!name){
    return res
    .status(400)
    .json({ success:false, msg:'Please provide name value' })
  }
  res.status(201).json({ success: true, person: name })
})


app.post('/api/postman/people', (req, res) => {
  const { name } = req. body
  if(!name){
    return res
    .status(400)
    .json({ success:false, msg:'Please provide name value' })
  }
  //with ... people we are sending people array and add new person/neme
  res.status(201).json({ success: true, data: [...people, name] })
})



//if its a real wwww we should provide a full domain instead of '/login' 
app.post('/login', (req, res) => {
  const { name }= req.body
  //console.log(req.body);
  if(name){
    return res.status(200).send(`Welcome ${name}`)
  }
  res.status(401).send('Please Provide Credentals')
})


//put and delete requests need specific path

//PUT method- update data
app.put('/api/people/:id', (req, res) => {
  const { id } = req.params
  //req.params  returns parameters in the matched route

  //the parameter that we are changing
  const { name } = req.body
  //req.body  contains key-value pairs of data submitted in the request body. 
  
  //console.log(id, name)
  //in console we get 3 polly (3 is passed in url: localhost:5000/api/people/3)
  // if the person desnt exist user will get an error, if exists- the data (ex. name) will be rewritten
 
  //if person-id that user is looking for/writing in the link is equal to some id in people array,   i'll get the person to modify with put method
 const person = people.find((person)=> person.id === Number(id))
 if(!person){
  return res
  .status(400)
  .json({ success:false, msg:'Please provide name value' })
}
const newPeople = people.map((person) =>{
  if(person.id === Number(id)){
    person.name = name
  }
  return person
})
res.status(200).json({ success: true , data: newPeople })

})



//DELETE METHOD
app.delete('/api/people/:id', (req, res) => {
  
  const person = people.find((person)=> person.id === Number(req.params.id))
  // id in array === id in the link requested by user
  if(!person){
  return res
  .status(404)
  .json({ success: false, msg:`no person with id ${req.params.id}` })
}
const newPeople = people.filter((person) => person.id !== Number(req.params.id))
return res.status(200).json({ success: true , data : newPeople})
})

//checking if evrth works
  //res.send('hello world')


app.listen(5000, () => {
  console.log('Server is listening on port 5000....');
});
