import {EventEmitter} from "node:events";
const task = new EventEmitter() ;


// Regester listeners
task.on("greet" , (name)=> {
    console.log(`Hello,${name}! Welcome to the session.`) ;
} ) ;

task.on("exit",(reason) => {
    console.log(`Session ending. Reason: ${reason}`) ;
}) ;
task.on("start",(course) => {
    console.log(`${course} started`) ;
}) ;

// Emit (trigger) events
task.emit("greet","students") ;
task.emit("exit","class complete") ;
task.emit("start","fsd") ;