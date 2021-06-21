const express = require("express");
const bcrypt = require("bcryptjs");
const dotenv = require('dotenv');
const jwt = require("jsonwebtoken");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const User = require("../mongoSchema/user");

dotenv.config()

router.post(
  "/",
  [
    check("email", "Iltimos email adress kiriting!").isEmail(),
    check(
      "password",
      "Parol 6ta dan ko'p belgi va harflardan iborat bo'lishi kerak!"
    ).isLength({ min: 6 }),
  ],
  async (req, res) => {

    let msg
    
    const error = validationResult(req);
    error.errors.map(err => msg=err.msg)
    
    if (!error.isEmpty()) {
      return res.status(400).json({ error: msg });
    }

    const { name, email, password } = req.body;

    try {
      let user = await User.findOne({ email });

      if (user) {
        return res.status(400).json({error:"Siz oldin ro'yhatdan o'tgansiz!"});
      }

      user = new User({
        name,
        email,
        password,
        isAdmin: false
      });

      let salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
      await user.save();

      const payloud = {
        user: {
          id: user.id,
        },
      };

      jwt.sign(
        payloud,
        process.env.jwtKey,
        { expiresIn: 36000 },
        (err, token) => {
          if (err) {
            throw err
          }
          res.cookie('token',token,{httpOnly: true})
          res.json({ token,isAdmin:false });
        }
      );
    } catch (err) {
      res.status(500).json({msg:"Server xatosi"});
    }
  }
);

module.exports = router;
