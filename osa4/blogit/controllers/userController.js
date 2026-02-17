const bcrypt = require("bcrypt");
const userController = require("express").Router();
const User = require("../models/User");

userController.get("/", async (req, res) => {
    try {
        const users = await User.find({}).populate("blogs", {likes: 0});
        res.status(200).json(users);
    }
    catch(err) {
        next(err);
    }
});

userController.post("/", async (req, res, next) => {
    try {
        const {username, name, password} = req.body;
        if(password.length < 3) res.status(400).json({err: "Validation failed"});

        const saltRounds = 10;
        const passwordHash = await bcrypt.hash(password, saltRounds);
        
        const newUser = new User({
            username, name, passwordHash
        });
        await newUser.save();

        res.status(201).json(newUser);
    }
    catch(err) {
        next(err);
    }
});

module.exports = userController;