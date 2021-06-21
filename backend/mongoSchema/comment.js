const mongose = require('mongoose')

const commentSchema =new mongose.Schema({
    id:{
        type:String
    },
    comment:{
        type:String
    },
    user:{
        type: String
    },
    date: {
        type: String,
        default: new Date()  }
});

const Comments=mongose.model('comments',commentSchema);
module.exports= Comments;