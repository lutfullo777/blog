const express = require("express");
const router = express.Router();
const Model = require('../mongoSchema/user');

router.get("/", async (req, res) => {
  try{
    const users = await Model.find().select("-password");
    res.json(users);
  }
  catch(err){
    res.json(err);
  }
});

module.exports = router;
