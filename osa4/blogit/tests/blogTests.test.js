const { test, describe } = require('node:test')
const assert = require('node:assert')
const {favoriteBlog, totalLikes, authorWithMostBlogs, authorWithMostLikes, dummy, blogs, } = require('../utils/listHelper')

test('dummy returns one', () => {
  const blogs = []

  const result = dummy(blogs)
  assert.strictEqual(result, 1)
})

describe('total likes', () => {
  const listWithOneBlog = [
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 5,
      __v: 0
    }
  ]

  test('when list has only one blog equals the likes of that', () => {
    const result = totalLikes(listWithOneBlog)
    assert.strictEqual(result, 5)
  });
});

describe("given a list of blogs,", () => {
  test("a blog with most likes is found", () => {
    const mostLiked = {
      _id: "5a422b3a1b54a676234d17f9",
      title: "Canonical string reduction",
      author: "Edsger W. Dijkstra",
      url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
      likes: 12,
      __v: 0
    };

    assert.deepStrictEqual(favoriteBlog(blogs), mostLiked);
  });

  test("the author with most publishes is found", () => {
    const mostActiveAuthor = {
      author: "Robert C. Martin",
      blogs: 3
    };

    assert.deepStrictEqual(authorWithMostBlogs(blogs), mostActiveAuthor);
  });

    test("the author with most publishes is found", () => {
    const mostLikedAuthor = {
  author: "Edsger W. Dijkstra",
  likes: 17
}

    assert.deepStrictEqual(authorWithMostLikes(blogs), mostLikedAuthor);
  });
});