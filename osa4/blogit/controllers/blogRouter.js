const blogRouter  = require("express").Router();
const Blog = require("../models/Blog");

blogRouter.get("/", (req, res) => {
    Blog.find({}).then(data => res.json(data));
});

blogRouter.post("/", (req, res) => {
  const blog = new Blog(req.body);

  blog.save()
    .then((result) => {
      res.status(201).json(result);
    })
    .catch(err => {
      res.status(404).json(err);
    })
});

module.exports = blogRouter;