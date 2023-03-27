const mongoose=require('mongoose')

//userSchema
const userSchema=mongoose.Schema({
    username:String,
    location:String,
    email:{
        type:String,
        unique:true,
        required:true
    },
    password:{
        type:String,
        unique:true,
        required:true
    },
    age:Number
},{
    versionKey:false
})
const userModel=mongoose.model('user',userSchema)
module.exports={userModel}
