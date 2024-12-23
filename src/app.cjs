let express=require("express");
let app=express();
const port=8080;

app.listen(port,(req,res)=>{
    console.log("Server is listening to : ",port);
});