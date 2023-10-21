const mongoose = require('mongoose');

const userShcema = new mongoose.Schema({
    name:{
        type : String,
        trim:true,
        maxlength:50,
        required:true
    },
    email:{
        type : String,
        trim:true,
        maxlength:50,
        required:true,
      
    },
    password:{
        type: String,
        required:true
    },

    role:{
        type : mongoose.Schema.Types.ObjectId,
        ref:"Role"
    },
    isVerified:{
        type : Boolean,
        default: false
    }
    
})

const User = mongoose.model("User",userShcema)


module.exports= User