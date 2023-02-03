const express = require("express"),
  app = express(),
  port = process.env.PORT || 5000,
  cors = require("cors");
  
  
const mongoose = require("mongoose")
let status;
app.use(express.json())
app.use(cors());
app.listen(port, () => console.log("Backend server live on " + port));
mongoose.set('strictQuery',false)
mongoose.connect("mongodb://localhost:27017/E-commerce",{
    useNewUrlParser:true,
    useUnifiedTopology:true
}).then(status="connected to mongodb database",console.log("Connected to mongoDb")).catch((err)=>status="not connected to mongodb")

const nestedSchema = new mongoose.Schema({
    
    colour:String,
    "hair type":String,
    Material:String,
    Origin:String,
    Quality:String
   
})

const userSchema = new mongoose.Schema({
   Category:String,
   name:String,
   brand:String,
   review:Number,
   price:Number,
   img:String,
   specification:nestedSchema,
   "about item":{
    first:String,
    second:String,
    third:String,
    fourth:String,
    fifth:String
   }
})
const User = mongoose.model('Products',userSchema)
app.get("/groceries", (req, res) => {
  User.find({"Category":'Groceries'},function(err,docs){
       var data = docs
   res.send({status:data})
  })

});
app.get("/pharmacy", (req, res) => {
  User.find({"Category":'Pharmacy'},function(err,docs){
       var data = docs



   res.send({status:data})
  })

});
app.get("/shoe", (req, res) => {
  User.find({"Category":'Shoe'},function(err,docs){
       var data = docs



   res.send({status:data})
  })

});
app.get("/jacket", (req, res) => {
  User.find({"Category":'Jacket'},function(err,docs){
       var data = docs

 

   res.send({status:data})
  })

});
app.get("/", (req, res) => {
  User.find({"Category":{$ne:null}},function(err,docs){
       var data = docs
   res.send({status:data})
  })
});
const orderSchema = new mongoose.Schema({
  createdAt : String,
  email : String,
  order: [String],
})
const newUser = mongoose.model('orders',orderSchema)
app.post('/orderplaced',(req,res)=>{
  let s = new Date()
  var user={
createdAt : s.getDate().toString()+"-"+(s.getMonth()+1).toString()+"-"+s.getFullYear().toString()  ,
email:req.body.email,
order:req.body.orders,
  }
 newUser.insertMany(user).then(()=>console.log("Added to database")).catch((err)=>console.log(err))
})
app.post("/orders",(req,res)=>{
   newUser.find({"email":req.body.email},function(err,docs){
       var data = docs
  console.log(data)
   res.send({status:data})
  })
})
// newUser.deleteMany().then(console.log("hihih"))