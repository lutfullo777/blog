const mongose = require('mongoose')

const PostSchema =new mongose.Schema({
    title:{
        type:String
    },
    date: {
        type: String,
        default: new Date()  },
    dislike: {
        type: Number
    },
    like:{
        type:Number
    },
    seen:{
        type:Number
    },
    photo:{
        type:String,
        default: '/uploads\\image.jpg'
    },
    paragraph:{
        type:String
    }
});

const Posts=mongose.model('posts',PostSchema);
module.exports= Posts;