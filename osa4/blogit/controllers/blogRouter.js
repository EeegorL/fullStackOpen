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
      console.log(err)
      res.status(400).json(err);
    })
});

module.exports = blogRouter;