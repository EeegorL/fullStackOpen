const express = require("express");
const blogController = express();
const Blog = require("../models/Blog");
const {errorHandler} = require("../utils/middleware");

blogController.get("/", async (req, res, next) => {
    try {
        const blogs = await Blog.find({});
        res.json(blogs);
    }
    catch(err) {
        next(err);
    }
})

blogController.post("/", async (req, res, next) => {
    try {
        const blog = new Blog(req.body)
        const created = await blog.save();
        
        res.status(201).json(created);
    }
    catch(err) {
        next(err);
    }
});

module.exports = blogController;