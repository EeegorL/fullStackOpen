const blogController = require("express").Router();
const Blog = require("../models/Blog");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const {userExtractor} = require("../utils/middleware");

blogController.get("/", async (req, res, next) => {
    try {
        const blogs = await Blog.find({}).populate("author", {blogs: 0});
        res.status(200).json(blogs);
    }
    catch(err) {
        next(err);
    }
});

blogController.get("/:id", async (req, res, next) => {
    try {
        const id = req.params.id;
        const blog = await Blog.findOne({_id: id}).populate("author");

        if(blog === null) res.status(404).end();
        else res.status(200).json(blog);
    }
    catch(err) {
        next(err);
    }
});

blogController.post("/", userExtractor, async (req, res, next) => {
    try {
        if(!req.body.title || !req.body.url) return res.status(400).end();
        
        const user = req.user;

        const author = await User.findById(user.id);
        if(!author) return res.status(400).json({err: "You... do not exist? How is that possible?"});

        const blog = new Blog({...req.body, author: author.id});
        
        const created = await blog.save();
        author.blogs.push(blog.id);
        await author.save();
        
        return res.status(201).json(created);
    }
    catch(err) {
        next(err);
    }
});

blogController.delete("/:id", userExtractor, async (req, res, next) => {
    try {
        const id = req.params.id;
        const blog = await Blog.findOne({_id: id});
        if(!blog) return res.status(404).json({err: "The blog does not exist"});

        const authorId = blog.author;
        if(authorId.toString() !== req.user.id.toString()) {
            return res.status(401).json({err: "Unauthorized"});
        }
        const deletion = await Blog.deleteOne({_id: id});
        
        if(deletion.deletedCount > 0) {
            return res.status(200).end();
        }
        else {
            return res.status(404).end();
        }
    }
    catch(err) {
        next(err);
    }
});

blogController.put("/:id", userExtractor, async (req, res, next) => {
    try {
        const id = req.params.id;
        const body = req.body;

        const blog = await Blog.findOne({_id: id});
        if(!blog) return res.status(404).json({err: "The blog does not exist"});

        if(blog.author.toString() !== req.user.id) return res.status(401).json({err: "Unauthorized"});
        
        const update = await Blog.updateOne({_id: id}, body);
        
        if(update.matchedCount < 1) res.status(404).end();

        res.status(200).end();
    }
    catch(err) {
        next(err);
    }
});

module.exports = blogController;