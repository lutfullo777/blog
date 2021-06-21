import { combineReducers } from 'redux';
import userLogin from './userLogin'
import userRegister from './userRegister'
import {Posts, getPostById, createPost, updatePost, deletePost} from './Posts'
import {sendComment, getComment} from './comment'


export default combineReducers({
    userLogin,
    userRegister,
    getPostById,
    createPost,
    updatePost,
    deletePost,
    Posts,
    sendComment,
    getComment
});