const loginController = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

loginController.post("/", async (req, res) => {
    const {username, password} = req.body;

    const user = await User.findOne({username});

    const credentialsCorrect = user !== null
    ? await bcrypt.compare(password, user.passwordHash)
    : false;

    if(!credentialsCorrect) {
        return res.status(401).json({err: "Invalid credentials"});
    }

    const tokenBody = {
        id: user.id,
        name: user.name,
        username: user.username
    };

    const token = jwt.sign(tokenBody, process.env.JWT_SECRET);

    return res.status(200).json({token: token, data: tokenBody});
});

module.exports = loginController;