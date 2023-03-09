// npm - global command, comes with node
//npm --version

//local dependency- use it only in this particular project
//npm i <packageName>

//global dependency- use it in any project
//npm install -g <packageName>
//sudo npm install -g <packageName> (mac)

//package.json- manifest file (stores important information about project/package)
//manual approach (create package.json in the root, create properties, etc)
//npm init (step by step, press enter to skip)
//npm init -y (evrything default)

//uninstall dependency
//npm uninstall <packageName>

//install nodemon npm i nodemon -D (it´s a devdependency)
//"dependencies" : Packages required by your application in production.
// "devDependencies" : Packages that are only needed for local development and testing. (fortmatting..))


//in package.json:

//  "scripts": {
    //here we can set up the commands we want to use:
    // "start": "node app.js" - with npm start it will run the local server 1time

    //"start": "nodemon app.js", - with npm start it will listen to changes on server 
   // "dev": "nodemon app.js" //- with npm run dev it will listen to changes on server 
  //},

const _ = require('lodash')
const items = [1,[2,[3,[4]]]]
const newItems = _.flattenDeep(items)
//console.log(items)
console.log(newItems)