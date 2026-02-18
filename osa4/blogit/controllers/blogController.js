const blogController = require("express").Router();
const Blog = require("../models/Blog");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const {tokenExtractor} = require("../utils/middleware");

blogController.use(tokenExtractor)

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
        const blog = await Blog.findOne({_id: id});

        if(blog === null) res.status(404).end();
        else res.status(200).json(blog);
    }
    catch(err) {
        next(err);
    }
});

blogController.post("/", async (req, res, next) => {
    try {
        if(!req.body.title || !req.body.url) return res.status(400).end();
        
        const token = req.token;
        if(!token) return res.status(401).json({err: "Authorization token missing you nitwit"});

        const auth = jwt.verify(token, process.env.JWT_SECRET);
        if(!auth.id) return res.status(401).json({err: "Invalid token you scatterbrain"});
        // console.log(auth)
        const author = await User.findById(auth.id);
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

blogController.delete("/:id", async (req, res, next) => {
    try {
        const id = req.params.id;
        const deletion = await Blog.deleteOne({_id: id});
        if(deletion.deletedCount > 0) {
            res.status(200).end();
        }
        else {
            res.status(404).end();
        }
    }
    catch(err) {
        next(err);
    }
});

blogController.put("/:id", async (req, res, next) => {
    try {
        const id = req.params.id;
        const body = req.body;
        
        const update = await Blog.updateOne({_id: id}, body);
        
        if(update.matchedCount < 1) res.status(404).end();

        res.status(200).end();
    }
    catch(err) {
        next(err);
    }
});

module.exports = blogController;