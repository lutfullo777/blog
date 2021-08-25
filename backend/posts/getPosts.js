const express = require('express')
const postsData = require('../mongoSchema/posts')
const router = express.Router()
const fs = require('fs')




router.route('/').get(async (req,res)=>{
    let posts = await postsData.find()
    posts = posts.reverse()
    // posts.map(post => {
    //     const photo = post.photo.split('\\');

    //     if(!fs.existsSync(`uploads/${photo[1]}`)){
    //     post.photo = '/image.jpg'
    // }
    // })
    
    res.json({posts})
})


module.exports = router