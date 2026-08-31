console.log("Task has been Started");

process.nextTick(()=>{
    console.log("nextTick") ;
}) ;

setTimeout(()=>{
    console.log("SetTimeout") ;
},2000) ;

setImmediate(()=> {
    console.log("setImmediate") ;
});

console.log("End");