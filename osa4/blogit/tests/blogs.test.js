const {test, describe, beforeEach, after} = require("node:test");
const assert = require("node:assert");

const supertest = require("supertest");
const mongoose = require("mongoose");
const app = require("../app");
const Blog = require("../models/Blog");

const {blogs} = require("../utils/listHelper.js");

const api = supertest(app);

const initialBlogs = blogs();

beforeEach(async () => {
    await Blog.deleteMany({});

    for(let blog of initialBlogs) {
        let b = new Blog(blog);
        await b.save();
    }
});

describe("When fetching blogs,", () => {
    test("all are returned", async () => {
        const f = await api.get("/api/blogs");
        assert.strictEqual(f.body.length, initialBlogs.length);
    });

    test("blogs are returned as JSON", async () => {
        await api.get("/api/blogs")
        .expect(200)
        .expect("Content-Type", /application\/json/);
    });
});

after(async () => {
    await mongoose.connection.close();
})