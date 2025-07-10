const express = require("express");
const mongo = require("mongoose");
const app = express();
const blogRouter = require("./controllers/blogRouter");
const config = require("./utils/config");
const logger = require("./utils/logger");


logger.log("Yhdistetään...");
mongo.connect(config.MONGO_URI)
    .then(logger.log("Yhdistetty"))
    .catch(e => logger.error(e));

app.use(express.json());
app.use(express.static('dist'));

app.use(blogRouter);

module.exports = app;