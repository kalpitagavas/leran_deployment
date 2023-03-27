const express=require("express")
const {connection}=require('./db')
const {noteRouter}=require("./routes/notes.routes")
const{userRouter}=require('./routes/user.route')
const {auth}=require("./middleware/auth.middleware")
const cors=require("cors")
require("dotenv").config()
const app=express()
app.use(cors())


app.use(express.json())
app.use('/users',userRouter)
app.use('/notes',auth,noteRouter)


app.listen(process.env.port,async()=>{
    try{
        await connection
        console.log('connected to db')
    }
    catch(err){
        console.log('cannot connet to db')
        console.log(err)
    }
    console.log("server is running at 4400")
})