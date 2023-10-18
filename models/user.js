const mongoose = require('mongoose');
// const uuid = require('uuid/v1')
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
    // salt:{
    //     type:String
    // },
    role:{
        type : mongoose.Schema.Types.ObjectId,
        ref:"Role"
    }
    
})

// userShcema.virtual('password')
// .set((password)=>{
//     this._password=password;
//     // this.salt = uuid();
//     this.hashed_password =this.cryptPassword(password)

// })
// .get(()=>{
//     return this._password;
// })
// userShcema.methods = {
//     cryptPassword: function(password){
//         if(!password) return '';

//         try{
//             return crypto
//             .createHmac('sha1',this.salt)
//             .update(password)
//             .digest('hex');
//         }catch(error){
//             return ''

//         }
//     }

// }
const User = mongoose.model("User",userShcema)


module.exports= User