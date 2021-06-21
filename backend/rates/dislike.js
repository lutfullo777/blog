const express = require('express')
const router = express.Router()
const Post = require('../mongoSchema/posts')

router.put('/', async (req,res)=>{
    const _id = req.body.id
    const post = await Post.find({_id: req.body.id})
 
    const updateData = {
        dislike: post[0].dislike+1
    }
    await Post.findByIdAndUpdate(_id,updateData,(err,updated)=>{
        if(err){
            res.status(501).json({msg:err})
        }
        else{
            res.status(200).json({updateData})
        }
    })
})

module.exports = router