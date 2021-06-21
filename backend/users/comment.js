const express = require('express')
const router = express.Router();
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
const Comments = require('../mongoSchema/comment');
const moment = require('moment')
const { admin,auth } = require('../middleware/auth')


dotenv.config()

router.post('/set',async (req,res) => {
    
    let token;
    const isToken=req.headers.authorization;


    if(isToken){
        token = isToken.split(' ')[1]
    }

    if(!token){
        return res.status(401).json({err:'Sizda kirish tokeningiz mavjud emas.'})
    }

    try{
        const decode = jwt.verify(token,process.env.jwtKey);
        const comment = new Comments({user:decode.user.name, comment:req.body.comment, date:moment().utcOffset("+05:00").format('DD.MM.YYYY HH:mm'), id:req.body.id})

        await comment.save()
        res.status(201).json({comment})
    }
    catch(err){
        res.status(401).json({err:'Yaroqsiz token!'});
    }
});

router.get('/get/:id', async (req,res) => {
    try{
        const idPost = req.params.id
        const comments = await Comments.find({id:idPost});
    
        res.json(comments)
    }catch(err){
        res.status(404).json(err)
    }
});

router.delete('/delete/:id',auth, admin, async (req,res)=>{
    try{
        const commentId = req.params.id
        const comment = await Comments.findByIdAndDelete(commentId);
        res.json(comment)
    }catch(err){
        res.json(err)
    }
})

module.exports = router