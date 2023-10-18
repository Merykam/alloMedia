const mongoose = require('mongoose');
const roleSheme = new mongoose.Schema({
    name:{
        type : String,
        trim:true,
        minlength:50,
        required:true
    }
    
},{timestamps:true})

module.exports= mongoose.model("Role",roleSheme)