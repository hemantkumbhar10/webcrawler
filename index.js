const { crawlPage } = require("./crawl.js");

function index() {
  if (process.argv.length < 3) {
    console.log("No website provided!");
    process.exit(1);
  }

  if (process.argv.length > 3) {
    console.log("Too many command line args!");
    process.exit(1);
  }

  // for (const arg of process.argv) {
  //   console.log(arg);
  //}

  const baseURL = process.argv[2];

  console.log(`Starting to crawl ${baseURL}`);
  crawlPage(baseURL);
}

index();
