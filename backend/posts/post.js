const express = require('express')
const Router = express.Router()
const PostData = require('../mongoSchema/posts');
const fs = require('fs')

Router.get('/:id', async (req, res) => {
    try{
        const id = req.params.id
    const post = await PostData.findById(id);
    const photo = post.photo.split('\\');

    if(!fs.existsSync(`uploads/${photo[1]}`)){
        post.photo = '/image.jpg'
    }
    res.json(post)
    }catch(err){
        res.status(404).json(err)
    }
})

module.exports = Router