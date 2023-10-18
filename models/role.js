const mongoose = require('mongoose');
const roleShema = new mongoose.Schema({
    name:{
        type : String,
        trim:true,
        maxlength:50,
        required:true
    }
    
},{timestamps:true})


const role = mongoose.model("Role",roleShema);

module.exports=role;
