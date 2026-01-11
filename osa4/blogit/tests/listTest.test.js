const {test, describe} = require("node:test");
const assert = require("node:assert");
const {blogs, totalLikes, favoriteBlog, mostBlogs, mostLikes} = require("../utils/blogHelper");

describe("total likes", () => {
    test("of an empty array is 0", () => {
        const emptyList = [];
        assert.equal(totalLikes(emptyList), 0);
    });

    test("of an array with a single blog equals the likes of the said blog", () => {
        const listWithBlog = [
            {
            _id: '5a422aa71b54a676234d17f8',
            title: 'Go To Statement Considered Harmful',
            author: 'Edsger W. Dijkstra',
            url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
            likes: 5,
            __v: 0
            }
        ];
        assert.equal(totalLikes(listWithBlog), 5);
    });

    test("of a bigger array are summed up correctly", () => {
        const listWithLotsOfBlogs = blogs();
        const expectedLikes = 36;

        assert.equal(totalLikes(listWithLotsOfBlogs), 36);
    });
});

describe("a favorite blog", () => {
    test("in an empty list does not exist", () => {
        assert(!favoriteBlog([])); // no favorite blog
    });

    test("in an array with a single blog is the blog itself", () => {
        const testBlog = {
            _id: '5a422aa71b54a676234d17f8',
            title: 'Go To Statement Considered Harmful',
            author: 'Edsger W. Dijkstra',
            url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
            likes: 5,
            __v: 0
            };
        const listWithBlog = [testBlog];

        assert.deepEqual(favoriteBlog(listWithBlog), testBlog);
    });

    test("in a larger list is correct", () => {
        const supposedFavorite = {
            _id: "5a422b3a1b54a676234d17f9",
            title: "Canonical string reduction",
            author: "Edsger W. Dijkstra",
            url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
            likes: 12,
            __v: 0
        };
        const lisOfBlogs = blogs();

        assert.deepEqual(favoriteBlog(lisOfBlogs), supposedFavorite);
    });
});

describe("the most active blogger", () => {
    test("is null if there are no blogs", () => {
        assert.equal(mostBlogs([]), null);
    });

    test("in a single item array is the author of that single blog", () => {
        const testBlog = {
            _id: '5a422aa71b54a676234d17f8',
            title: 'Go To Statement Considered Harmful',
            author: 'Edsger W. Dijkstra',
            url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
            likes: 5,
            __v: 0
            };
        const listWithBlog = [testBlog];
        
        const expected = {
            author: "Edsger W. Dijkstra",
            blogs: 1
        }

        assert.deepEqual(mostBlogs(listWithBlog), expected);
    });

    test("in a larger array is correct", () => {
        const blogArray = blogs();
        const expected = {
            author: "Robert C. Martin",
            blogs: 3
        };

        assert.deepEqual(mostBlogs(blogArray), expected);
    });
});

describe("the most liked author", () => {
    test("in an array on none is null", () => {
        const emptyArr = [];

        assert.equal(mostLikes(emptyArr), null);
    });

    test("in an array of one is the only author", () => {
        const testBlog = {
            _id: '5a422aa71b54a676234d17f8',
            title: 'Go To Statement Considered Harmful',
            author: 'Edsger W. Dijkstra',
            url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
            likes: 5,
            __v: 0
            };
        const listWithBlog = [testBlog];

        assert.deepEqual(mostLikes(listWithBlog), {author: "Edsger W. Dijkstra", likes: 5});
    });

    test("in a larger array is correct", () => {
        const blogArray = blogs();
        const expected = {
            author: "Edsger W. Dijkstra",
            likes: 17
        };

        assert.deepEqual(mostLikes(blogArray), expected);
    });
});