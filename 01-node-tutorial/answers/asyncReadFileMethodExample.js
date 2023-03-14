const { readFile } = require('fs')

console.log('started a first task')

//check file path!!!
// node runs call back funciones once all the other immediate tasks are executed
// so first we get started a first task, starting new task and then console.log(result), console.log('completed first task')
//this hapes because readFile methodis async

readFile('./content/first.txt', 'utf8', (err, result)=>{
    if (err){
        console.log(err)
        return
    }

    console.log(result)
    console.log('completed first task')
})

console.log('starting new task')