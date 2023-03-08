// CommonJS, every file in node.js is module (by default)
// !!!!!! Modules - Encapsulated Code (only share minimum)

const names = require('./04-names')
const sayHi = require('./05-utils') 
//console.log(names)

const data = require('./06-alternative-flavour')
console.log(data)

require('./07-mind-grenade') // - we export the function, the code will run even though if didnt asign it to a variable

sayHi('Susan');
sayHi(names.john);
sayHi(names.peter);
// or change  the 4th line:  const {peter, john} = require('./04-names')