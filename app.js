const express = require ("express");
const mysql = require ("mysql");
const app = express();
const hbs=require("hbs")
const path=require("path")
app.use(express.urlencoded({extended: true}))
const uuid =require("uuid")

const publicDirectoryPath=path.join(__dirname,"../public")
app.use(express.static(publicDirectoryPath))

app.set("view engine","hbs")

const db = mysql.createConnection({
    host:"localhost",
    user:"asif",
    password:"786786",
    database:"project"

})

db.connect((err)=>{
    if (err){
        throw err;
    }
    console.log("database connected")
})

app.get("/",(req,res)=>{
    res.render("index")
})

app.post("/student",(req,res)=>{
    let student={id:uuid(),name:req.body.name,regno:req.body.regno,dept:req.body.dept,gmail:req.body.gmail}
    let sql="insert into students set ?";
    let query=db.query(sql,student,(err,result)=>{
        if(err)
        {
            throw err;
        }
        console.log("student saved");
        res.redirect("/students");
    })
})

app.get("/students",(req,res)=>{
      
    let sql="select * from students"
    let query=db.query(sql,(err,result)=>{
        if (err){
            throw err;
        }
        res.render("students",{
            student:result
        })
    })
})



app.listen("3000",()=>{
    console.log("server started on port 3000");
})