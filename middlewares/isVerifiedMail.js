const User = require('../models/user');
const jwt = require('jsonwebtoken');

async function IsVerified(req, res, next) {

    const token = req.cookies.token;
    
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decodedToken.userId;

 

    const user = await User.findOne({_id: userId });

    if(!user.isVerified){
        res.json({'message' : 'Verify your mail'});
    }


    next(); 

}


module.exports=IsVerified;