const jwt = require("jsonwebtoken");

const {info, error} = require("./logger");

const log = (req, res, next) => {
    info(`${req.url} - ${res.statusCode}`);
    next();
};

const errorHandler = (err, req, res, next) => {
    if(err.name === "MongoServerError" && err.message.includes("E11000 duplicate key error")) {
        return res.status(409).json({err: "Duplicate key"});
    }
    else if(err.name === "ValidationError") {
        return res.status(400).json({err: "Validation failed"});
    }
    else if(err.name === "StrictModeError") {
        return res.status(400).json({err: "Invalid data"});
    }
    else if(err.name === "JsonWebTokenError") {
        return res.status(401).json({err: "Invalid token"});
    }
    next();
};

const userExtractor = async (req, res, next) => {
    const auth = req.get("authorization");
    if(!auth || !auth.startsWith("Bearer ")) return res.status(401).json({err: "Authorization token missing"});


    const token = auth.replace("Bearer ", "");
    const user = jwt.verify(token, process.env.JWT_SECRET);

    if(!user.id) return res.status(401).json({err: "Invalid token"});

    req.user = {
        id: user.id,
        username: user.username,
        name: user.name
    }
    next();
}

module.exports = {userExtractor, errorHandler, log};