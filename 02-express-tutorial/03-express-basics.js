const express = require('express'); // first we import the module
const app = express(); //then we envoke it

//all the browsers are performing a get request
// every time user enters on out website he is sending a get request (read data)
app.get('/', (req, res) => {
  console.log('user hit the server');
  //our response to user´s get request:
  res.status(200).send('Home page');
});

app.get('/about', (req, res) => {
  res.status(200).send('About page');
});

app.all('*', (req, res)=>{
    res.status(404).send('<h1>resource not found</h1>')
})

app.listen(5000, () => {
  console.log('server is listening on port 5000');
});

//Commands that we will use:
// app.get -read data
// app.post -insert data
// app.put -update data
// app.delete
// app.all
// app.use
// app.listen
