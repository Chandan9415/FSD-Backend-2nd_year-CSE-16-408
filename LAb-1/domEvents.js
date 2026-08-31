import { create } from "node:domain";
import {EventEmitter} from "node:events" ;
function createDOMElement() {
    const emitter = new EventEmitter() ;

    return {
         addEventListener(eventName , callback) {
            emitter.on(eventName , callback) ;
        },
        removeEventListener(eventName , callback) {
            emitter.off(eventName , callback) ;
        } ,

        dispatchEvent(event) {
            emitter.emit(event.type,event) ;
        } ,
    } ;
}

const button = createDOMElement() ;
button.addEventListener('Click' , ()=>{
    console.log("Button Clicked then i am iron man ") ;
}) ; 
button.dispatchEvent({
    type: "Click"  // there has pass with key ->value pair
}) ;
button.addEventListener('save' ,handleClick) ;

function handleClick(event) {
    console.log(`button clicked!`) ;
    console.log(`Event Type: ${event.type}`) ;
    console.log(`message: ${event.detail}`) ;
}
button.addEventListener('save' ,handleClick) ;
button.dispatchEvent({
    type:'save' 
})