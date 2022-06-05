const fetch = require("node-fetch");
const { parse } = require("node-html-parser");

class Youtube {
  constructor(query) {
    this.query = query;
    this.BaseUrl = `https://www.google.com/search?q=${encodeURI(
      query
    )}&tbm=vid&hl=en`;
  }

  async getVideoId() {
    const content = await fetch(this.BaseUrl);
    const html = await content.text();
    let linkList = parse(html)
      .getElementsByTagName("a")
      .filter((link) => link.rawAttrs.includes("https://www.youtube.com/watch"))
      .map((link) =>
        decodeURIComponent(link.rawAttrs.split("url?q=")[1].split("&")[0])
      );

    linkList = [...new Set(linkList)];

    if (linkList.length > 0) return linkList[1];
    else return "Not found";
  }
}

module.exports = Youtube;
