const express = require("express");
const app = express();
const mongoose = require("mongoose");
const blogController = require("./controllers/blogController");
const {log, errorHandler} = require("./utils/middleware");
const {mongo_uri} = require("./utils/config");

app.use(express.json());

mongoose.connect(mongo_uri)
.then(()=>console.log("Yhdistetty"))
.catch(err => console.log(err));


app.use("/api/blogs", blogController);

app.use(errorHandler);
app.use(log);

module.exports = app;