const {info, error} = require("./logger");

const log = (req, res, next) => {
    info(`${req.url} - ${res.statusCode}`);
    next();
};

const errorHandler = (err, req, res, next) => {
    if(err.name === "MongoServerError" && err.message.includes("E11000 duplicate key error")) {
        res.status(409).json({err: "Duplicate key"});
    }
    else if(err.name === "ValidationError") {
        res.status(400).json({err: "Validation failed"});
    }
    else if(err.name === "StrictModeError") {
        res.status(400).json({err: "Invalid data"});
    }
    next();
};

const tokenExtractor = (req, res, next) => {
    const auth = req.get("authorization");
    if(auth && auth.startsWith("Bearer ")) {
        req.token = auth.replace("Bearer ", "");
    }

    next();
}

module.exports = {tokenExtractor, errorHandler, log};