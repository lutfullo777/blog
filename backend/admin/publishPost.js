const express = require('express');
const router = express.Router();
const Post = require('../mongoSchema/posts')
const {auth, admin} = require('../middleware/auth')
const fs = require('fs')
const { promisify } =require('util')
const moment = require('moment')

const unlinkAsync = promisify(fs.unlink)


  

router.post('/', auth, admin, async(req,res)=>{
    
    const { title, paragraph } = req.body
    try{
        const post =new Post({
            title,
            dislike: 0,
            like: 0,
            seen: 0,
            date: moment().utcOffset("+05:00").format('DD.MM.YYYY HH:mm'),
            paragraph,
            photo:'/uploads\\image.jpg'
        });
        res.status(201).json({msg: 'Post qo\'shish',post})
        await post.save()
    }catch(err){
        res.status(400).json({err: "Post qo'shishda xatolik yuz berdi!"})
    }
})

router.put('/:id',auth,admin,async (req, res) => {
    try{
        const post = await Post.findById(req.params.id);
    if(post){
        const pathLen = req.body.photo.length
        const originalname = req.body.photo.slice(pathLen-3, pathLen);
        let photoName;
        originalname === 'peg' ? photoName = 'jpeg' : photoName = originalname;
        post.title=req.body.title;
        post.paragraph=req.body.paragraph;
        req.body.date ? post.date = req.body.date : post.date = moment().utcOffset("+05:00").format('DD.MM.YYYY HH:mm')
        post.photo = `/uploads\\${req.params.id}.${photoName}`
        await post.save();
        res.status(201).json({msg: "Post muvaffaqiyatli yuklandi"})
    }else{
        res.status(404).send({err: "Post yuklashda xatolik yuz berdi!"})
    }

    }catch(err){
        res.status(404).json({err: 'Post yuklanmadi!'})
    }
    
})

router.delete('/:id',auth,admin, async (req, res) => {
    try {

        const post = await Post.findByIdAndDelete(req.params.id);
 
        const photo = post.photo.split('\\')[1]
      
        if(photo !== 'image.jpg'){
            await unlinkAsync(`../Blog/uploads/${photo}`)
        }
        
        res.status(200).json({msg: 'Post o\'chirildi'});

    } catch (err) {
        res.status(200).json({msg: 'O\'chirishda xatolik yuz berdi'})
    }
    
})

module.exports = router