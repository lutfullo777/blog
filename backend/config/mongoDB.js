const mongose = require('mongoose');
const dotenv = require('dotenv')

dotenv.config()

const connectDB = async () => {
   
    try{
        const conn = await mongose.connect(process.env.MONGO_URI, {useUnifiedTopology:true,useNewUrlParser:true,useCreateIndex:true, useFindAndModify: false})

        console.log(`MongoDB connected on ${conn.connection.host}`);
    }catch(error){
        console.error(`Error ${error.message}`)
        process.exit(1);
    }
}

module.exports = connectDB