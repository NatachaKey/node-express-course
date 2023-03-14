const {readFileSync, writeFileSync} = require('fs');
console.log('start')
//or:  const fs = require('fs');
// fs. <--opens the methods

//getting access to some files in our filesystem
const first = readFileSync('./content/first.txt', 'utf8')
const second = readFileSync('./content/second.txt', 'utf8')
console.log(first,second)

//create new/overwrite text fle
writeFileSync('./content/result-sync.txt', `It´s Natacha and this is my result: ${first}, ${second}`, {flag: 'a'})
//{flag: 'a'} is optional, it adds the line one more time
console.log('done with this task')
console.log('starting the next one')