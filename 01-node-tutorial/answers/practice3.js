fs = require('fs').promises;
const { writeFile }= require('fs').promises
const { writeFileSync } = require('fs')


const makeFile = async () => {
    try {
        await writeFile('./content/practice3.txt',
        `This is the first line. \n`,
        {flag: 'a'})
    
    } catch(error) { 
        console.log(error);
    
    }
    for (let i = 2; i < 11; i++) {
        writeFileSync('./content/practice3.txt', `This is line ${i}.\n`, { flag: 'a' })
    }
    }

    makeFile()