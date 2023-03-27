const express=require("express")
const noteRouter=express.Router()
const{noteModel}=require("../model/note.model")
const jwt=require('jsonwebtoken')

noteRouter.get("/",async(req,res)=>{
    const token=req.headers.authorization.split(" ")[1]
    const decoded=jwt.verify(token,"masai")
try{
    if(decoded){
    const note=await noteModel.find({"userID":decoded.userID})
    res.status(200).send(note)
    }
}
catch(err){
    res.status(400).send({"msg":err.message})
}
})

noteRouter.post("/add",async(req,res)=>{
  try{
    const note=new noteModel(req.body)
    await note.save()
    res.status(200).send({"msg":"New node has been added"})
  }
  catch(err)
  {
    res.status(400).send({"msg":err.message})
  }
})

noteRouter.patch("/update/:nodeID",async(req,res)=>{

    const payload=req.body
    const noteID=req.params.noteID
    try{
       await noteModel.findByIdAndUpdate({_id:noteID},payload)
       res.status(200).send({"msg":"Note has been updated"})
    }
    catch(err){
           res.status(400).send({"msg":err.message})
    }
})


noteRouter.delete("/delete/:nodeID",async(req,res)=>{
    const token=req.headers.authorization.split(" ")[1]
    const decoded=jwt.verify(token,"masai")
   const req_id=decoded.userID
   const note=noteModel.findOne({_id:noteID})
   const userID_in_note=note.userID
    const noteID=req.params.nodeID
    try{
        if(req_id==userID_in_note)
        {
            await noteModel.findByIdAndDelete({_id:noteID})
            res.status(200).send({"msg":"Note has been deleted"})
        }
        else{
            res.send({"msg":"NOT authorized"
            })
        }
      
    }
    catch(err)
    {
        res.status(400).send({"msg":err.message})
    }
})
module.exports={noteRouter}