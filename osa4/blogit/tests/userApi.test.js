const {test, describe, beforeEach, after} = require("node:test");
const mongoose = require("mongoose");
const supertest = require("supertest");
const assert = require("node:assert");
const bcrypt = require("bcrypt");

const User = require("../models/Blog.js");
const app = require("../app.js");

const api = supertest(app);

const {blogsInDb, usersInDb} = require("../utils/helper.js");

describe("with one user in db", async () => {
    beforeEach(async () => {
        await User.deleteMany({});

        // const userData = {
        //     name: "Kalle",
        //     username: "KunkkuKalle",
        //     passwordHash: await bcrypt.hash("salasana", 10)
        // };
        // const user = new User(userData);
        // await user.save();    
    });

    test("a valid user can be added", async () => {
        const usersThen = await usersInDb();

        const newUser = {
            name: "Aabeecee",
            username: "Kissa kävelee",
            password: "mahtimörökölli123",
        };

        await api.post("/api/users")
        .send(newUser)
        .expect(201)
        .expect("Content-Type", /application\/json/)

        const usersNow = await usersInDb();
        assert(usersNow.length == usersThen.length + 1);
    });
});


after(async () => {
    await mongoose.connection.close();
})