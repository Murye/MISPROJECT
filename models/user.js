const mongoose=require('mongoose');
const UserSchema=new mongoose.Schema({
    Surname:String,
    Age:Number,
    Email:String
})
module.exports=mongoose.model('user',UserSchema)
