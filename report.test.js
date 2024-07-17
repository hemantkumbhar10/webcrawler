const { sortPages } = require("./report.js");
const { test, expect } = require("@jest/globals");

test("sortPages", () => {
  const input = {
    "https://dummyjson.com/recipes": 1,
    "https://dummyjson.com": 3,
  };
  const actual = sortPages(input);
  const expected = [
    ["https://dummyjson.com", 3],
    ["https://dummyjson.com/recipes", 1],
  ];
  expect(actual).toEqual(expected);
});

test("sortPages 5 pages", () => {
  const input = {
    "https://dummyjson.com/recipes": 1,
    "https://dummyjson.com": 3,
    "https://dummyjson.com/cart": 5,
    "https://dummyjson.com/users": 2,
    "https://dummyjson.com/posts": 9,
  };
  const actual = sortPages(input);
  const expected = [
    ["https://dummyjson.com/posts", 9],
    ["https://dummyjson.com/cart", 5],
    ["https://dummyjson.com", 3],
    ["https://dummyjson.com/users", 2],
    ["https://dummyjson.com/recipes", 1],
  ];
  expect(actual).toEqual(expected);
});
