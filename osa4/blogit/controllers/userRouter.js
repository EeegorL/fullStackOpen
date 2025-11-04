const express = require("express");
const User = require("../models/User.js");
const bcrypt = require("bcrypt");
const userRouter = express.Router();

userRouter.post("/", async (request, response) => {
  try {
    const {username, name, password} = request.body;
    const saltRounds = 10;

    const passwordHash = await bcrypt.hash(password, saltRounds);

    const user = new User({
      username,
      name,
      passwordHash,
    });
    
    const savedUser = await user.save();

    response.status(201).json(savedUser);
  }
  catch(err) {
    console.log(err);
  }
});

module.exports = userRouter;