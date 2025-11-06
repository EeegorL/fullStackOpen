const {test, describe} = require("node:test");
const assert = require("node:assert");
const {dummy} = require("../utils/dummyHelper");

test("dummy returns 1", () => {
    assert(dummy(), 1);
});