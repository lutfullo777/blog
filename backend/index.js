const express = require('express');
const app = express()
const bodyParser = require('body-parser')
const dotenv = require('dotenv')
const morgan = require('morgan')
const path = require('path')
const connectDB = require('./config/mongoDB');
const { errorHandler, notFound } = require('./middleware/error')


dotenv.config()
connectDB()

if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'))
  }

app.use(bodyParser.json())

//Mains 
app.use('/register',require('./users/user'))
app.use('/api/auth',require('./users/auth'))
app.use('/api/posts', require('./posts/getPosts'))
app.use('/seen', require('./rates/seen'))
app.use('/like',require('./rates/like'))
app.use('/dislike',require('./rates/dislike'))
app.use('/post',require('./posts/post'))
app.use('/comment', require('./users/comment'))

//admin
app.use("/admin/users", require("./admin/users"));
app.use('/admin/post',require('./admin/publishPost'))
// app.use('/admin/upload',require('./admin/upload'))


const dirname = path.resolve()
app.use('/uploads', express.static(path.join(dirname, '/uploads')))

if(process.env.NODE_ENV === 'production'){
  app.use(express.static(path.join(__dirname, '../frontend/build')))

  app.get('*', (req, res) => res.sendFile(path.resolve(__dirname, '../frontend', 'build', 'index.html')))
}else{
  app.get("/", (req, res) =>{
    res.send("API is running....")
  })
}

app.use(notFound)
app.use(errorHandler)

const PORT = process.env.PORT || 5000

app.listen(PORT,()=>{
    console.log(`${PORT} port ishlashni boshladi`);
})