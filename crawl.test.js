const { normalizeURL, getURLsFromHTML } = require("./crawl.js");
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

test("getURLsFromHTML absolute", () => {
  const inputHTMLBody = `
<html>
    <body>
        <a href="https://dummyjson.com/recipes/">Dummy Json Recipes</a>
    </body>
</html>
`;

  const inputBaseURL = "https://dummyjson.com/recipes/";
  const actual = getURLsFromHTML(inputHTMLBody, inputBaseURL);
  const expected = ["https://dummyjson.com/recipes/"];
  expect(actual).toEqual(expected);
});

test("getURLsFromHTML relative", () => {
  const inputHTMLBody = `
<html>
    <body>
        <a href="/recipes/">Dummy Json Recipes</a>
    </body>
</html>
`;

  const inputBaseURL = "https://dummyjson.com";
  const actual = getURLsFromHTML(inputHTMLBody, inputBaseURL);
  const expected = ["https://dummyjson.com/recipes/"];
  expect(actual).toEqual(expected);
});

test("getURLsFromHTML both relative and absolute", () => {
  const inputHTMLBody = `
<html>
    <body>
        <a href="https://dummyjson.com/carts/">Dummy Json Absolute Carts</a>
        <a href="/recipes/">Dummy Json Relative Recipes</a>
    </body>
</html>
`;

  const inputBaseURL = "https://dummyjson.com";
  const actual = getURLsFromHTML(inputHTMLBody, inputBaseURL);
  const expected = [
    "https://dummyjson.com/carts/",
    "https://dummyjson.com/recipes/",
  ];
  expect(actual).toEqual(expected);
});

test("getURLsFromHTML invalid", () => {
  const inputHTMLBody = `
<html>
    <body>
        <a href="invalid">Invalid Link</a>
    </body>
</html>
`;

  const inputBaseURL = "https://dummyjson.com";
  const actual = getURLsFromHTML(inputHTMLBody, inputBaseURL);
  const expected = [];
  expect(actual).toEqual(expected);
});
