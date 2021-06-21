const jwt=require('jsonwebtoken');
const dotenv = require('dotenv')

dotenv.config()

const auth = (req,res,next)=>{
    let token;
    const isToken=req.headers.authorization;

    if(isToken){
        token = isToken.split(' ')[1]
    }

    if(!token){
        return res.status(401).json({err:'Sizda kirish tokeningiz mavjud emas.'})
    }

    try{
        const decode = jwt.verify(token,process.env.jwtKey);
        req.user = decode.user;
        next();
    }
    catch(err){
        res.status(401).json({err:'Yaroqsiz token!'});
    }
}

const admin = (req, res, next) => {
    let token;
    const isToken=req.headers.authorization;

    if(isToken){
        token = isToken.split(' ')[1]
    }

    if(!token){
        return res.status(401).json({err:'Sizda kirish tokeningiz mavjud emas.'})
    }

    try{
        const decode = jwt.verify(token,process.env.jwtKey);
        if(decode.user.isAdmin){
            next();
        }else{
            res.status(401).json({err:'Siz admin emassiz!'})
        }
    }
    catch(err){
        res.status(401).json({err:'Yaroqsiz token'});
    }
  }

  module.exports={auth,admin}