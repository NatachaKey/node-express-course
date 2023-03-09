const EventEmitter = require('events')

const customEmitter= new EventEmitter()


//on- listen for an event
//emit- emit an event
//!!!! the logic matters: we first listen for event  (on) and then we emit it (emit)

//aka addEventListener on button , so when the event takes place- > show console.log('....)...
//we pass some arguments to the callback function so when we call it on line 25- we receive 'data received john with id 34' in console
customEmitter.on('response', (name, id)=>{
    console.log(`data received ${name} with id ${id}`);
    
})

//!!!! we can have as many functions for the same event as we want to
customEmitter.on('response', ()=>{
    console.log('some other logic here');
    
})


//we are emiting an event after saying that we are listening for event
customEmitter.emit('response', 'john', 34)