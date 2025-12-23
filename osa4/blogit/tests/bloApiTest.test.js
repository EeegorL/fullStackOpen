const app = require("../app");
const Blog = require("../models/Blog.js");
const supertest = require("supertest");
const {blogs} = require("../utils/listHelper.js");

const {test, describe, beforeEach, after} = require("node:test");
const assert = require("node:assert");
const mongoose = require("mongoose");

const api = supertest(app);

beforeEach(async () => {
    await Blog.deleteMany({});
    for(const blog of blogs()) {
        const newBlog = new Blog(blog);
        await newBlog.save();
    }
});

describe("when fetching all blogs", () => {
    test("the blogs are successfully returned as JSON", async () => {
        await api.get("/api/blogs")
        .expect(200)
        .expect("Content-Type", /application\/json/);
    });

    test("the identifying field is 'id', not '_id'", async () => {
        const f = (await api.get("/api/blogs")).body[0];
        assert(f.id && !f._id);
    });
});

describe("when adding blogs,", () => {
    test("a single blog can be added", async () => {
            const testBlog = {
                _id: '5a422aa71b54a676234d4512',
                title: 'To Go Question Considered Useful',
                author: 'Wedsger D. Jikstra',
                url: 'http://www.somelink.com/blog',
                likes: 50,
                __v: 0
            };

        const beforeLen = (await Blog.find({})).length;
        await api.post("/api/blogs")
        .send(testBlog)
        .expect(201);
        const afterLen = (await Blog.find({})).length;

        assert(afterLen === beforeLen + 1);
    });

    test("a blog without set likes is initialized to 0", async () => {
            const testBlog = {
                _id: '5a422aa71b54a676234d4512',
                title: 'To Go Question Considered Useful',
                author: 'Wedsger D. Jikstra',
                url: 'http://www.somelink.com/blog',
            //  likes: 0,
                __v: 0
            };

            await api.post("/api/blogs")
            .send(testBlog)
            .expect(201);

            const addedBlog = await Blog.findOne({url: testBlog.url});
            assert(addedBlog.likes === 0);
    });

    test("a blog without a title or url is rejected with 400", async () => {
            await api.post("/api/blogs")
            .send(
                {

                }
            )
            .expect(400);

            await api.post("/api/blogs")
            .send(
                {

                }
            )
            .expect(400);
    });
});

after(async () => {
    await mongoose.connection.close();
});