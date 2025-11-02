const {test, after, beforeEach} = require("node:test");
const mongoose = require("mongoose");
const supertest = require("supertest");

const app = require("../app.js");

const assert = require("node:assert");

const api = supertest(app);
const Blog = require("../models/Blog.js");
const {blogs} = require("../utils/listHelper.js");

beforeEach(async () => {
    await Blog.deleteMany({});

    for(const blog of blogs) {
        let newBlog = new Blog(blog);
        await newBlog.save();
    }
});

test("blogs return as JSON", async () => {
    await api
        .get("/")
        .expect(200)
        .expect("Content-Type", /application\/json/)
});

test("all blogs are returned", async () => {
    const res = await api.get("/");
    assert.strictEqual(res.body.length, 6);
});

test("a specific blog is within the returned blogs", async () => {
    const specimen = blogs[2];
    delete specimen._id;
    delete specimen.__v;

    const allBlogs = await api.get("/");
    const blogAddresses = allBlogs.body.map(b => b.url);

    assert.deepStrictEqual(await blogAddresses.includes(specimen.url), true);
});

test("a blog can be added", async () => {
    const newBlog = {
        title: "A new blog",
        author: "The blog's author",
        url: "The blog's url",
        likes: 1
    };

    await api.post("/")
    .send(newBlog)
    .expect(201)
    .expect("Content-Type", /application\/json/);

    const getBlogs = (await api.get("/")).body;
    const contents = getBlogs.map(blog => blog.url);

    assert.strictEqual(contents.length, blogs.length + 1);
    assert(contents.includes(newBlog.url));
});

after(async() => {
    await mongoose.connection.close();
});