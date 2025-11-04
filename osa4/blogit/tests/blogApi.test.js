const {test, after, beforeEach, describe} = require("node:test");
const mongoose = require("mongoose");
const supertest = require("supertest");

const app = require("../app.js");

const assert = require("node:assert");

const api = supertest(app);
const Blog = require("../models/Blog.js");
const {blogs} = require("../utils/helper.js");

beforeEach(async () => {
    await Blog.deleteMany({});

    for(const blog of blogs) {
        let newBlog = new Blog(blog);
        await newBlog.save();
    }
});

describe("when GETting blogs,", () => {
    test("blogs return as JSON", async () => {
        await api
            .get("/api/blogs")
            .expect(200)
            .expect("Content-Type", /application\/json/)
    });

    test("all blogs are returned", async () => {
        const res = await api.get("/api/blogs");
        assert.strictEqual(res.body.length, blogs.length);
    });

    test("a specific blog is within the returned blogs", async () => {
        const specimen = blogs[2];
        delete specimen._id;
        delete specimen.__v;

        const allBlogs = await api.get("/api/blogs");
        const blogAddresses = allBlogs.body.map(b => b.url);

        assert.deepStrictEqual(await blogAddresses.includes(specimen.url), true);
    });

    test("the id-field is set manually in the default's stead", async () => {
        const res = (await api.get("/api/blogs")).body;
        const sample = res[0];

        assert(sample._id === undefined);
        assert(sample.id);
    });
});

describe("when POSTing blogs,", async () => {
    test("a blog is added successfully", async () => {
        const newBlog = {
            title: "A new blog",
            author: "The blog's author",
            url: "The blog's url",
            likes: 1
        };

        await api.post("/api/blogs")
        .send(newBlog)
        .expect(201)
        .expect("Content-Type", /application\/json/);

        const getBlogs = (await api.get("/api/blogs")).body;
        const contents = getBlogs.map(blog => blog.url);

        assert.strictEqual(contents.length, blogs.length + 1);
        assert(contents.includes(newBlog.url));
    });

    test("a blog without like field is initialized correctly", async () => {
        const newBlog = {
            title: "A new blog",
            author: "The blog's author",
            url: "The blog's url",
        };

        await api.post("/api/blogs").send(newBlog);

        const getBlogs = (await api.get("/api/blogs")).body;
        const addedNewBlog = getBlogs[getBlogs.length - 1];

        assert(addedNewBlog.likes === 0);
    });

    test("a blog without title or url fails", async () => {
        const noTitle = {
            author: "The blog's author",
            url: "The blog's url",
        };

        const noUrl = {
            title: "A new blog",
            author: "The blog's author",
        };

        const neither = {
            author: "The blog's author",
        };

        // ois voinu tehdä Promise.all listalla mut tehää näi

        await api.post("/api/blogs")
        .send(noTitle)
        .expect(400);

        await api.post("/api/blogs")
        .send(noUrl)
        .expect(400);

        await api.post("/api/blogs")
        .send(neither)
        .expect(400);
    });
});


after(async () => {
    await mongoose.connection.close();
});