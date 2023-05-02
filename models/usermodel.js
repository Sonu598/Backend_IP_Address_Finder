const mongoose=require('mongoose');

const userSchema=mongoose.Schema({
    name:String,
    email:String,
    Password:String,
    searches:{
        ipAddress:String,
        city:String,
        createdAt:Date
    }
})

const UserModel=mongoose.model('User',userSchema);

module.exports={
    UserModel
}