const request = require("tinyreq");
const cheerio = require("cheerio");

exports.ParseClien = class ParseClien {
  constructor(url) {
    this._url = url;
    this._tag = "tr.mytr";
    this._articles = null;

    // this.getHtmlBody = this.getHtmlBody.bind();
    // this.getJsonFromBody = this.getJsonFromBody.bind();
  }

  get url() {
    return this._url;
  }

  set url(url) {
    this._url = url;
  }

  getJsonFromBody() {
    var articles;
    request(this._url, (err, body) => {
      let htmlBody = cheerio.load(err || body);
      articles = htmlBody(this._tag);
      articles.each((i, elem) => {
        var pageData = {};
        pageData["id"] = htmlBody(elem).children().html();
        pageData["post_category"] = htmlBody(elem).children(".post_category").text();
        pageData["post_subject"] = htmlBody(elem).children(".post_subject").text();
        pageData["post_name"] = htmlBody(elem).children(".post_name").text();

        console.log('[KangLOG] pageData : ' + JSON.stringify(pageData));
      })
    })
  }
}