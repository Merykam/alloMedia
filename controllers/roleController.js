
const Role = require('../models/role');

const inserRoles = async (req,res)=>{

    const role = new Role({
        name:req.body.name
   
    });


    await role.save()

    res.json({ss: 'success'})


}

module.exports= inserRoles;