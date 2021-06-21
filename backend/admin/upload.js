const express = require('express');
const router = express.Router();
const multer = require('multer')
const path = require('path')
const Post = require('../mongoSchema/posts')
const {auth, admin} = require('../middleware/auth')

const storage = multer.diskStorage({
    destination(req, file, cb) {
      cb(null, 'uploads/')
    },
    filename(req, file, cb) {
      cb(
        null,
        `${req.params.id}${path.extname(file.originalname)}`
      )
    },
  })
  
  function checkFileType(file, cb) {
    const filetypes = /jpg|jpeg|png/
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase())
    const mimetype = filetypes.test(file.mimetype)
  
    if (extname && mimetype) {
      return cb(null, true)
    } else {
      cb('Images only!')
    }
  }

  const upload = multer({
    storage,
    fileFilter: function (req, file, cb) {
      checkFileType(file, cb)
    },
  })

  router.post('/:id',auth, admin, upload.single('image'), async (req, res)=>{
      res.status(201).send({msg: 'rasm joylandi!',path: req.file.path})
  })


  module.exports = router