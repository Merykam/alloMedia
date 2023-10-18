const User = require('../models/user');
const Role = require('../models/role');


    const  getUsers = (req,res) =>{

        res.send("hellooo useeers");  
    }

    const signup = async (req,res)=>{
        console.log(req.body);

        let role = await Role.findOne({name:req.body.role});
        // const user = new User(req.body);
        if(!role){
            return res.status(400).json({error: "fuuckk"})
        }
        const user = new User({
            name:req.body.name,
            email:req.body.email,
            password:req.body.password,
            role: role._id
        });

        // user.save(function(err,user){
        //     if(err){
        //         return res.status(400).send(err)
        //     }
        //     res.send(user)
        // })
        await user.save()

        res.json({ss: 'success'})


   

    }

module.exports={
    getUsers,
    signup
};