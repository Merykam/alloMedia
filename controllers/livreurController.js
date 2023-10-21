
const User = require('../models/user');
const jwt = require('jsonwebtoken');


const HelloLivreur=async (req,res)=>{
   
    const token = req.cookies.token;

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decodedToken.userId;

 

    const user = await User.findOne({_id: userId });

    console.log(user);
    
    return res.json({message: `Helloo ${user.name} your role is : Delivryman`})
}

 module.exports=HelloLivreur;
