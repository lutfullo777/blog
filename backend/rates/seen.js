const express = require('express')
const router = express.Router()
const Post = require('../mongoSchema/posts')

router.put('/:id', async (req,res)=>{

    console.log(new Date().toLocaleString());
    
   
    const post = await Post.find({_id: req.params.id})
    
    
    const updateData = {
        seen: post[0].seen+1
    }
    await Post.findByIdAndUpdate(req.params.id,updateData,(err,updated)=>{
        if(err){
            res.status(501).json({msg:err})
        }
        else{
            res.status(200).json({updated})
        }
    })
})

module.exports = router