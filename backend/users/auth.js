const express=require('express');
const router=express.Router();
const bcrypt=require('bcryptjs');
const dotenv = require('dotenv');
const {auth} = require('../middleware/auth');
const User = require('../mongoSchema/user');
const jwt=require('jsonwebtoken');
const {check,validationResult}=require('express-validator');

dotenv.config()

router.get('/',auth,async(req,res)=>{
    try{
        const user=await User.findById(req.user.id).select('-password');
        console.log(req.user);
        return res.json(user)
    }
    catch(err){
        return res.status(500).send('Server xatosi')
    }
});


router.post('/',[
    check('email','Iltimos email adress kiriting').isEmail(),
    check('password','Parolni kiriting').exists()
],async (req,res)=>{
    const error=validationResult(req);
    if(!error.isEmpty()){
        return res.status(400).json({error:error.array()[0].msg});
    }

    const {email,password} = req.body

    try{
        let user = await User.findOne({email});

        if(!user){
            return res.status(400).json({error:'Ushbu email ro\'yhatdan o\'tmagan!'});
        }

        const isValid = await bcrypt.compare(password,user.password);
        
        if(!isValid){
            return res.status(400).json({error:'Email yoki parol xato!'});
        }

        const payloud={
            user:{
                id:user.id,
                name:user.name,
                email:user.email,
                isAdmin: user.isAdmin
            }
        }

        jwt.sign(payloud,process.env.jwtKey,{expiresIn:36000},(err,token)=>{
            if(err){ throw err }
            res.json({ token, isAdmin: user.isAdmin })
        })

    }
    catch(err){
        console.error(err.message);
        res.status(500).send('Server xatosi');
    }
});


module.exports=router;
