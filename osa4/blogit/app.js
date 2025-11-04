const express = require("express");
const mongo = require("mongoose");
const app = express();
const config = require("./utils/config");
const logger = require("./utils/logger");

const blogRouter = require("./controllers/blogRouter");
const userRouter = require("./controllers/userRouter");

logger.log("Yhdistetään...");

mongo.connect(config.MONGO_URI)
    .then(logger.log("Yhdistetty"))
    .catch(e => logger.error(e));

app.use(express.json());
app.use(express.static('dist'));

app.use("/api/blogs", blogRouter);
app.use("/api/users", userRouter);

module.exports = app;