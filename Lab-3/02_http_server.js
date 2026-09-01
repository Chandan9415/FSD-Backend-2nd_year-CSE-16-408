import http from "http";
const userdata =[{
    id : 101 ,
    name : "Abc" ,
    email : "cm@abes.call.in" 
}]
const server=http.createServer((req,res)=>{
    //   res.statusCode=201;
    //   res.setHeader("Content-type","text/plane");
    //   res.end("Hello Serever.")
    const url=req.url;
    const method=req.method;
    if(url=="/msg" && method == "GET"){
        res.end("This is welcome message from server");
    }
    else if(url=="/sys" && method == "GET"){
        res.end("This is system information");
    }
    else if (url =="/data" && method =="GET") {
        res.end(JSON.stringify(userdata)) ;
    } else if (url=="/create" && method=="POST") {
        let body = "" ;
        req.on("data",(chunk)=>{
            body += chunk ;
        })
        req.on("end",()=> {
          const newdata =JSON.parse(body) ;
          const newuserdata = {
            id : newdata.id ,
            name:newdata.name,
            email:newdata.email
          }  
          userdata.push(newuserdata)
          res.end("")
        })
    }else if (url=="/users" && method == "GET") {
        res.end(JSON.stringify(userdata)) ;
    }
})
server.listen(3000,()=>{
    console.log("Server is running on port number 3000");
})