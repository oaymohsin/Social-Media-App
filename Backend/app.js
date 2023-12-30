const express = require("express");
const bodyParser=require("body-parser")
const app = express();

// MONGO_URI="mongodb+srv://mohsinmaken3:76510063Msn@cluster0.epwsfar.mongodb.net/"
// MONGO_URI="mongodb+srv://mohsinmaken3:76510063Msn@cluster0.epwsfar.mongodb.net/SocialMediaApp"

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))

app.use((req,res,next)=>{
    res.setHeader("Access-Control-Allow-Origin","*");
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin,X-Requested-With,Content-Type,Accept"
    );
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET,POST,PUT,PATCH,DELETE,OPTIONS"
    );
    next();
})

app.post('/api/posts',(req,res,next)=>{
  const posts=req.body;
  console.log(posts)

  res.status(201).json({
    message:"Post added Successfully"
  })
})

app.get('/api/posts',(req, res, next) => {
  const posts=[
    {
        id:"dsklfsdlk",
        title:"this is first post",
        content:"content of first post"
    },
    {
        id:"eriorjkljsfd",
        title:"this is second post",
        content:"content of second"
    }
  ]
  res.status(200).json({
    message:"post fetched successfully",
    posts:posts
  })
});



module.exports = app;
