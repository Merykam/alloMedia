const User = require('../models/user');
const Role = require('../models/role');
const bcryptjs = require('bcryptjs');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const  {sendMail,sendResetPasswordEmail} = require('../services/email');


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
            const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
            sendMail(req.body.email,token);
            res.json({ success: true, message: 'Check your email to verify.' });
        }catch (error) {
            res.status(500).json({ success: false, error: error.message });
        }

      


   

    }




    const signin = async (req, res) => {
        const { email, password } = req.body;
    
        try {
            const user = await User.findOne({ email });
            if (!user) {
                return res.status(401).json({ error: 'Adresse e-mail ou mot de passe incorrect.' });
            }
    
            const isPasswordValid = await bcryptjs.compare(password, user.password);
            if (!isPasswordValid) {
                return res.status(401).json({ error: 'Adresse e-mail ou mot de passe incorrect.' });
            }
    
            const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
    

            res.cookie('token',token, {expire : new Date() + 3600000 })
            return res.json({ 
                success: true, 
                data: {
                    userId: user.id,
                    email: user.email,
                    token: token,
                  }, });
        } catch (error) {
            res.status(500).json({ success: false, error: error.message });
        }
    };

    const signout = (req,res)=>{
        res.clearCookie('token');
        return res.json({message : "user signout"})
    }

    



    const verifyEmail = async (req, res) => {
        const token = req.params.token;
        if(!token){
            return res.json({error: 'finahowa token'})
        }
    
        try {
       
            const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
            const userId = decodedToken.userId;

          
          
            console.log(decodedToken);
           
            await User.findOneAndUpdate({ _id: userId }, { isVerified: true });


            return res.json({success: 'Email has been verified successfully'})
    
        } catch (error) {
            
            res.status(400).json({ success: false, error: 'Lien de vérification invalide ou expiré.' });
        }
    };




    const forgotPassword = async (req, res) => {
        const { email } = req.body;
        try {
            const user = await User.findOne({ email });
            if (!user) {
                return res.status(404).json({ error: 'Utilisateur non trouvé.' });
            }
    
            const resetToken = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
                expiresIn: '2h' // le jeton expirera dans 1 heure
            });
    
           
    
            // Envoyez l'e-mail avec le lien de réinitialisation de mot de passe
            const resetPasswordLink = `${process.env.CLIENT_URL}/reset-password/${resetToken}`;
            await sendResetPasswordEmail(email, resetPasswordLink);
    
            return res.json({ success: true, message: 'Instructions de réinitialisation de mot de passe envoyées par e-mail.' });
        } catch (error) {
            res.status(500).json({ success: false, error: error.message });
        }
    };
    

    const resetPassword = async (req, res) => {
        const { token } = req.params;
        const { newPassword } = req.body;
    
        try {
    


            const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
            const userId = decodedToken.userId;
            console.log(userId);

            const user = await User.findOne({ _id: userId });
    
            if (!user) {
                return res.status(400).json({ error: 'Lien de réinitialisation invalide ou expiré.' });
            }
    
            // Mettez à jour le mot de passe et réinitialisez les champs de jeton
            const hashedPassword = await bcryptjs.hash(newPassword, 10);
            await User.findOneAndUpdate({ _id: userId }, { password: hashedPassword });
            // user.password = hashedPassword;
            // await user.save();
    
            return res.json({ success: true, message: 'Mot de passe réinitialisé avec succès.' });
        } catch (error) {
            res.status(500).json({ success: false, error: error.message });
        }
    };


module.exports={
    getUsers,
    signup,
    signin,
    signout,
    verifyEmail,
    forgotPassword,
    resetPassword
};