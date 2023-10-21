const User = require('../models/user');
const jwt = require('jsonwebtoken');

async function IsManager(req, res, next) {

    const token = req.cookies.token;
    
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decodedToken.userId;
   
    const userRole = await User.findById(userId)
    .populate({
      path: 'role',
      select: 'name', 
    });



    if(userRole.role.name !=="manager"){
        res.json({'message' : 'Your are not manager'});
    }


    next(); 

}


module.exports=IsManager;