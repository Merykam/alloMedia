const User = require('../models/user');
const jwt = require('jsonwebtoken');

async function IsDelivry(req, res, next) {

    const token = req.cookies.token;
    
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decodedToken.userId;
   
    const userRole = await User.findById(userId)
    .populate({
      path: 'role',
      select: 'name', 
    });



    if(userRole.role.name !=="livreur"){
        res.json({'message' : 'Your are not delivery man'});
    }


    next(); 

}


module.exports=IsDelivry;