const express = require("express");
const app = express();
const mongoose = require("mongoose");

const blogController = require("./controllers/blogController");
const userController = require("./controllers/userController");

const {log, errorHandler} = require("./utils/middleware");
const {mongo_uri} = require("./utils/config");

app.use(express.json());

mongoose.connect(mongo_uri)
    .then(()=>console.log("Yhdistetty"))
    .catch(err => console.log(err));

app.use("/api/blogs", blogController);
app.use("/api/users", userController);

app.use(errorHandler);
app.use(log);

module.exports = app;