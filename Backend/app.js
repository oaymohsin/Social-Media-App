const express = require("express");
const app = express();

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

app.use('/api/posts',(req, res, next) => {
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
