const {info, error} = require("./logger");

const log = (req, res, next) => {
    info(`${req.url} - ${res.statusCode}`);
    next();
};

const errorHandler = (err, req, res, next) => {
    if(err.name === "MongoServerError" && err.message.includes("E11000 duplicate key error collection")) {
        res.status(409).json({err: "Duplicate key"});
    }
    next();
};

module.exports = {errorHandler, log};