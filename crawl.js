const { JSDOM } = require("jsdom");

function getURLsFromHTML(htmlBody, baseURL) {
  const urls = [];
  const dom = new JSDOM(htmlBody);
  const linkElements = dom.window.document.querySelectorAll("a");
  for (const link of linkElements) {
    if (link.href.slice(0, 1) === "/") {
      //relative urls
      try {
        const urlObj = new URL(`${baseURL}${link.href}`);
        urls.push(urlObj.href);
      } catch (e) {
        console.log("Error with relative URL: ", e.message);
      }
    } else {
      //absolute urls
      try {
        const urlObj = new URL(link.href);
        urls.push(urlObj.href);
      } catch (e) {
        console.log("Error with absolute URL: ", e.message);
      }
    }
  }
  return urls;
}

function normalizeURL(urlString) {
  const urlObj = new URL(urlString);

  const hostpath = `${urlObj.hostname}${urlObj.pathname}`;

  if (hostpath.length > 0 && hostpath.slice(-1) === "/") {
    return hostpath.slice(0, -1);
  }

  return hostpath;
}

module.exports = { getURLsFromHTML, normalizeURL };
