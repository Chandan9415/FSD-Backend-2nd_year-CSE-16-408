import express from "express";
const app = express() ; // create a instance 
app.use(express.json()) ; // middle vare 
const userData =[{
    id : 101 ,
    name : "Abc" ,
    email : "cm@abes.call.in" 
}]
app.get("/msg",(req,res)=>{
    res.status(200).json ({
        message : "Welcome user" ,
    });
});
app.get("/user",(req,res)=>{
    res.status(200).json({message:"Data recived",userData}) ;
});
app.post("/create",(req,res)=>{
    const{id,name,email} = req.body
    const newUser = {id , name , email}
    userData.push(newUser) ;
    res.status(201).json({
        message : "User Created Succesfully",newUser
    }) ;
});
app.put("/edit/:id",(req,res)=>{
    const id =req.params.id ;
    const index = userData.findIndex((u)=>u.id==id);
    const {newid ,name , email}= req.body ;
    if(index==-1) {
        return res.end("User Not Found In data base ")
    } else {
        userData[index] = {id , name , email} ;
        res.status(201).json({
            message:"User Update sucessfully" 
        }) ;
    }
})
app.listen(4001,()=>{
    console.log("Server is running on port number 4001");
})