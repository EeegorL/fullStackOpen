const app = require("../app");
const Blog = require("../models/Blog.js");
const supertest = require("supertest");
const {blogs, someUser, users} = require("../utils/blogHelper.js");

const {test, describe, beforeEach, after} = require("node:test");
const assert = require("node:assert");
const mongoose = require("mongoose");
const User = require("../models/User.js");

const api = supertest(app);

const initialBlogs = blogs();
const initialUsers = users();

beforeEach(async () => {
    await User.deleteMany({});
    for(const user of initialUsers) {
        await api.post("/api/users")
        .send(user);
    }

    await Blog.deleteMany({});
    for(const blog of initialBlogs) {
        const author = await User.findOne({});
        blog.author = author.id;
        const newBlog = new Blog(blog);
        await newBlog.save();
    }
});

describe("when fetching blogs", () => {
    test("the blogs are successfully returned as JSON", async () => {
        await api.get("/api/blogs")
        .expect(200)
        .expect("Content-Type", /application\/json/);

        assert(((await api.get("/api/blogs"))).body.length === initialBlogs.length);
    });

    test("a specific blog is successfully returned", async () => {
        const exampleBlog = initialBlogs[0];

        await api.get(`/api/blogs/${exampleBlog._id}`)
        .expect(200);

        const fetchedBlog = await api.get(`/api/blogs/${exampleBlog._id}`);
        assert(exampleBlog.id === fetchedBlog.id);
    });

    test("a non-existent blog returns a 404 not found", async () => {
        await api.get("/api/blogs/thisIdIsNotReal")
        .expect(404);
    });

    test("the identifying field is 'id'", async () => {
        const f = (await api.get("/api/blogs")).body[0];
        assert(f.id && !f._id);
    });

    test("a specific blog is amongst the blogs", async () => {
        const f = (await api.get("/api/blogs")).body;
        const expectedBlog = initialBlogs[0];

        assert(f.some(x => x.id === expectedBlog._id));
    });
});

describe("when adding blogs,", () => {
    let token;
    beforeEach(async () => {
        const user = await someUser();
        token = (await api.post("/api/login")
        .send({
            username: user.username,
            password: "password123"
        })).body.token;
    });

    test("a single blog can be added with a valid login", async () => {
        const testBlog = {
            _id: '5a422aa71b54a676234d4512',
            title: 'To Go Question Considered Useful',
            author: (await someUser()).id,
            url: 'http://www.somelink.com/blog',
            likes: 50,
            __v: 0
        };

        const beforeLen = (await Blog.find({})).length;
        await api.post("/api/blogs")
        .send(testBlog)
        .auth(token, {type: "bearer"})
        .expect(201);

        const afterLen = (await Blog.find({})).length;

        assert(afterLen === beforeLen + 1);
    });

    test("a blog without set likes is initialized to 0", async () => {
        const testBlog = {
            _id: '5a422aa71b54a676234d4512',
            title: 'To Go Question Considered Useful',
            author: (await someUser()).id,
            url: 'http://www.somelink.com/blog',
        //  likes: 0,
            __v: 0
        };

        await api.post("/api/blogs")
        .send(testBlog)
        .auth(token, {type: "bearer"})
        .expect(201);

        const addedBlog = await Blog.findOne({url: testBlog.url});
        assert(addedBlog.likes === 0);
    });

    test("a blog without a title or url is rejected with 400", async () => {
        await api.post("/api/blogs")
        .send(
            {
            _id: '5a422aa71b54a676234d4512',
            title: 'To Go Question Considered Useful',
            author: (await someUser()).id,
            likes: 0,
            __v: 0
            }
        )
        .auth(token, {type: "bearer"})
        .expect(400);

        await api.post("/api/blogs")
        .send(
            {
            _id: '5a422aa71b54a676234d4512',
            author: (await someUser()).id,
            url: 'http://www.somelink.com/blog',
            likes: 0,
            __v: 0
            }
        )
        .auth(token, {type: "bearer"})
        .expect(400);
    });

    test("abscence of login causes error", async () => {
        const testBlog = {
            _id: '5a422aa71b54a676234d4512',
            title: 'To Go Question Considered Useful',
            author: (await someUser()).id,
            url: 'http://www.somelink.com/blog',
            likes: 50,
            __v: 0
        };

        const beforeLen = (await Blog.find({})).length;
        await api.post("/api/blogs")
        .send(testBlog)
        // .auth(token, {type: "bearer"})
        .expect(401);

        const afterLen = (await Blog.find({})).length;

        assert(afterLen === beforeLen);
    });
});

describe("when deleting blogs,", () => {
    test("one can be successfully deleted by the owner", async () => {
        const exampleBlog = await Blog.findOne({});

        const author = await User.findById(exampleBlog.author);
        const token = (await api.post("/api/login")
        .send({
            username: author.username,
            password: "password123"
        })).body.token;

        await api.delete(`/api/blogs/${exampleBlog.id}`)
        .auth(token, {type: "bearer"})
        .expect(200);

        await api.get(`/api/blogs/${exampleBlog.id}`)
        .expect(404);
    });

    test("a non-existent one returns a 404", async () => {
        const user = (await User.findOne({}));
        const login = await api.post("/api/login")
        .send({
                username: user.username,
                password: "password123"
        });

        await api.delete("/api/blogs/aNonExistentBlogId")
        .auth(login.body.token, {type: "bearer"})
        .expect(404);
    });

    test("deletion by some other than the owner gets rejected", async () => {
        const user = (await User.find({}))[1]; // the 0th is the author of all blogs
        const login = await api.post("/api/login")
        .send({
                username: user.username,
                password: "password123"
        });

        const someBlog = await Blog.findOne({});

        await api.delete(`/api/blogs/${someBlog.id}`)
        .auth(login.token, {type: "bearer"})
        .expect(401);
    });

    test("deletion without auth gets rejected", async () => {
        const someBlog = await Blog.findOne({});
        await api.delete(`/api/blogs/${someBlog.id}`)
        .expect(401);
    });
});

describe("when updating blogs,", () => {
    test("a blog can be updated with valid data by the author", async () => {
        const exampleBlog = await Blog.findOne({});
        const exampleId = exampleBlog.id;

        const author = await User.findOne({_id: exampleBlog.author})
        const login = await api.post("/api/login")
        .send({
            username: author.username,
            password: "password123"
        });

        const modifications = {
            ...exampleBlog.toObject(),
            likes: 100,
            title: exampleBlog.title + " : revised edition",
        };

        await api.put(`/api/blogs/${exampleId}`)
        .send(modifications)
        .auth(login.body.token, {type: "bearer"})
        .expect(200);

        const updatedBlog = await Blog.findOne({_id: modifications._id});
        assert(updatedBlog.title === modifications.title);
    });

    test("an update with invalid data is rejected", async () => {
        const exampleBlog = await Blog.findOne({});
        const exampleId = exampleBlog.id;

        const author = await User.findOne({_id: exampleBlog.author})
        const login = await api.post("/api/login")
        .send({
            username: author.username,
            password: "password123"
        });

        const modifications = {
            ...exampleBlog.toObject(),
            likes: 100,
            title: exampleBlog.title + " : revised edition",
            price: 500,
            weight_g: 52 // false field
        };

        await api.put(`/api/blogs/${exampleId}`)
        .send(modifications)
        .auth(login.body.token, {type: "bearer"})
        .expect(400);
    });

    test("an update without a login is rejected", async () => {
        const exampleBlog = await Blog.findOne({});
        const exampleId = exampleBlog.id;

        const modifications = {
            ...exampleBlog.toObject(),
            likes: 100,
            title: exampleBlog.title + " : revised edition",
            price: 500,
        };

        await api.put(`/api/blogs/${exampleId}`)
        .send(modifications)
        .expect(401);
    });
});

after(async () => {
    await mongoose.connection.close();
});