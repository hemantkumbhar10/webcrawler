const { JSDOM } = require("jsdom");

async function crawlPage(currentURL) {
  console.log(`Actively crawling: ${currentURL}`);

  try {
    const response = await fetch(currentURL);

    if (response.status > 399) {
      console.log(
        `Error in fetch with status code: ${response.status} on page ${currentURL}`,
      );
      return;
    }

    const contentType = response.headers.get("content-type");
    if (!contentType.includes("text/html")) {
      console.log(
        `Non HTML response, content type: ${contentType}, on page: ${currentURL}`,
      );
      return;
    }

    console.log(await response.text());
  } catch (e) {
    console.log(`Error in fetch. ${e.message}, on page ${currentURL}`);
  }
}

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

module.exports = { crawlPage, getURLsFromHTML, normalizeURL };
