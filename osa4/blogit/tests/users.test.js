const app = require("../app");

const {test, describe, beforeEach, after} = require("node:test");
const assert = require("node:assert");
const supertest = require("supertest");

const User = require("../models/User");

const mongoose = require("mongoose");
const api = supertest(app);
    beforeEach(async () => {
        await User.deleteMany({});
        
        const dummyUser = new User({
            username: "Jazzka",
            name: "Jasper Kivinen",
            passwordHash: "supersalainen"
        });

        await dummyUser.save();
    });
describe("with one user in db,", () => {
    test("creation with unused username succeeds", async () => {
        const usersThen = await User.find({});

        const newUser = {
            username: "Kalleee",
            name: "Kalle Ossinen",
            password: "meitsinSalasana"
        };
        
        await api.post("/api/users")
        .send(newUser)
        .expect(201)
        .expect("Content-Type", /application\/json/);

        const usersNow = await User.find({});

        assert.strictEqual(usersNow.length, usersThen.length + 1);

        const users = usersNow.map(u => u.username);
        assert(users.includes(newUser.username));
    });

    test("creation with a duplicate username fails", async () =>  {
        const existingUsernameUser = {
            username: "Jazzka",
            name: "Jarkko Jotonen",
            password: "abcdefghijklmn"
        }

        await api.post("/api/users")
        .send(existingUsernameUser)
        .expect(409);
    });

    test("creation with invalid user data fails", async () => {
        const usernameTooShort = {
            username: "a",
            name: "Jarkko Jotonen",
            password: "abcdefghijklmn"
        }

        await api.post("/api/users")
        .send(usernameTooShort)
        .expect(400);

        const passwordTooShort = {
            username: "Jaaaaaaaarkko",
            name: "Jarkko Jotonen",
            password: "a"
        }

        await api.post("/api/users")
        .send(passwordTooShort)
        .expect(400);
    });

    after(async () => {
        await mongoose.connection.close();
    });
});
