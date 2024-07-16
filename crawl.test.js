const { normalizeURL } = require("./crawl.js");
const { test, expect } = require("@jest/globals");

test("normalizeURL strip protocol", () => {
  const input = "https://dummyjson.com/recipes";
  const actual = normalizeURL(input);
  const expected = "dummyjson.com/recipes";
  expect(actual).toEqual(expected);
});

test("normalizeURL strip trailing slash", () => {
  const input = "https://dummyjson.com/recipes/";
  const actual = normalizeURL(input);
  const expected = "dummyjson.com/recipes";
  expect(actual).toEqual(expected);
});

test("normalizeURL capitals", () => {
  const input = "https://DUMMYJSON.com/recipes";
  const actual = normalizeURL(input);
  const expected = "dummyjson.com/recipes";
  expect(actual).toEqual(expected);
});

test("normalizeURL strip http", () => {
  const input = "http://dummyjson.com/recipes";
  const actual = normalizeURL(input);
  const expected = "dummyjson.com/recipes";
  expect(actual).toEqual(expected);
});
