const blogRouter  = require("express").Router();
const Blog = require("../models/Blog");

blogRouter.get("/", async (req, res) => {
    const blogs = await Blog.find({});
    res.json(blogs);
});

blogRouter.post("/", async (req, res) => {
  if(!req.body) res.status(400).end();
  if(!req.body.title || !req.body.url) res.status(400).end();

  if(!req.body.likes) req.body.likes = 0;
  const blog = new Blog(req.body);

  try {
    const req = await blog.save();
    res.status(201).json(req);
  }
  catch(err) {
    res.status(400).json(err);
  }
});

module.exports = blogRouter;