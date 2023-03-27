const express=require('express')
const { userModel } = require('../model/user.model')
const userRouter=express.Router()
const jwt=require('jsonwebtoken')
const bcrypt=require('bcrypt')


//registration
userRouter.post("/register",async(req,res)=>{
  const{email,password,location ,age,username}=req.body
    try{
    bcrypt.hash(password, 3, async(err, hash) =>{
        // Store hash in your password DB.
        const user=new userModel({email,password:hash,location,age,username})
        await user.save()
    res.status(200).send({"msg":"Registeration Done!"})
    console.log(user)    
});
    // const user=new userModel(req.body)
    // await user.save()
    // res.status(200).send({"msg":"Registeration Done!"})
   }
   catch(err)
   {
     res.status(400).send({"msg":"registration no tdome"})
   }
})




//login(authenticated)
userRouter.post("/login",async(req,res)=>{
    const {email,password}=req.body
    try{
      
       const user=await userModel.findOne({email})
      // console.log(user)
      if(user){
        bcrypt.compare(password,user.password,(err,result)=>{
          if(result){
            res.status(200).send({"msg":"login successfull","token":jwt.sign({"userID":user._id},"masai")})
          }
          else{
          res.status(400).send({"msg":"Wrong credential"})
          }
        })
      }
      }

       catch(err)
       {
         res.status(400).send({"msg":err.message})
       }
  
})

userRouter.get("/details",(req,res)=>{
  const token=req.headers.authorization
  jwt.verify(token,'masai',(err,decoded)=>{
    decoded?res.status(200).send("userdetails"):res.status(400).send({"msg":err.message})
  })
  
})

userRouter.get("/moviedata",(req,res)=>{
    const {token}=req.query
    jwt.verify(token,'bruce',(err,decoded)=>{
        decoded?res.status(200).send("moviedetails"):res.status(400).send({"msg":err.message})
      })
  })
module.exports={userRouter}