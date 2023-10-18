const User = require('../models/user');
const Role = require('../models/role');
const bcryptjs = require('bcryptjs');
const validator = require('validator');

    const  getUsers = (req,res) =>{

        res.send("hellooo useeers");  
    }

    const signup = async (req,res)=>{
       
        const { name, email, password } = req.body;

        if (!validator.isLength(name, { min: 1, max: 255 })) {
            return res.status(400).json({ error: 'Le nom est requis.' });
        }
    
        if (!validator.isEmail(email)) {
            return res.status(400).json({ error: 'Adresse e-mail invalide.' });
        }
    
        if (!validator.isLength(password, { min: 6 })) {
            return res.status(400).json({ error: 'Le mot de passe doit avoir au moins 6 caractères.' });
        }

        try{
            let role = await Role.findOne({name:req.body.role});
          
            if(!role){
                return res.status(400).json({error: "this role does't existe"})
            }
            const hashedPassword = await bcryptjs.hash(req.body.password, 10);

            const user = new User({
                name: req.body.name,
                email: req.body.email,
                password: hashedPassword,
                role: role._id
            });
    
            await user.save();
            res.json({ success: true, message: 'Utilisateur enregistré avec succès.' });
        }catch (error) {
            res.status(500).json({ success: false, error: error.message });
        }

      


   

    }

module.exports={
    getUsers,
    signup
};