const express = require('express');
const path = require('path');
const app = express();


//setup static and middleware
// .static method - means that the server doesnt need to change it(image files, styles.css, javascript files)
// so we can have thousands of files in thw public folder - and express will take care of them (find, path and show to the user)
//important: to setup simple sites- we can just put all our files to public folder and use the static method- to serve all the static files (img, html, css,js)
app.use(express.static('./public'))

//1 option
// app.get('/', (req,res)=>{
// res.sendFile(path.resolve(__dirname, './navbar-app/index.html'))
// //or path.join

//2 optionadding to static assets
//3 option SSR
// })

app.all('*', (req,res)=>{
    res.status(404).send('resource not found')
})
app.listen(5000, () => {
  console.log('server is listening on port 5000...');
});


