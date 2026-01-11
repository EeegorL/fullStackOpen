const express = require("express");
const bcrypt = require("bcrypt");
const userController = express();
const User = require("../models/User");

userController.get("/", async (req, res) => {
    res.status(200).json({text: "skibidi"});
});

userController.post("/", async (req, res, next) => {
    try {
        const {username, name, password} = req.body;
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