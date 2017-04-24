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

  get articles() {
    return this._articles;
  }

  getJsonFromBody() {
    var articles;
    var finalData;
    request(this._url, (err, body) => {
      let htmlBody = cheerio.load(err || body);
      articles = htmlBody(this._tag);
      this._articles = articles.map((i, elem) => {
        var pageData = {
          id: htmlBody(elem).children().html(),
          post_category: htmlBody(elem).children(".post_category").text(),
          post_subject: htmlBody(elem).children(".post_subject").text(),
          post_name: htmlBody(elem).children(".post_name").text()
        };        
        return pageData;
      })
      // console.log('[KangLOG] pageData : ' + JSON.stringify(this._articles.get()));
    })    
  }
}