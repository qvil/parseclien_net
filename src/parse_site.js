const request = require("tinyreq");
const cheerio = require("cheerio");

exports.ParseClien = class ParseClien {
  constructor(url) {
    this._url = url;
    this._tag = "tr.mytr";
    this._articles = null;
  }

  get articles() {
    return this._articles;
  }

  set url(url){
    this._url = url;
  }

  getJsonFromBody() {
    var articles;
    var finalData;
    request(this._url, (err, body) => { // Begin request
      let htmlBody = cheerio.load(err || body);
      articles = htmlBody(this._tag);

      this._articles = articles.map((i, elem) => { // Begin map
        let articleId = htmlBody(elem).children().html();
        if (articleId > 54920894){
          var pageData = {
          id: htmlBody(elem).children().html(),
          post_category: htmlBody(elem).children(".post_category").text(),
          post_subject: htmlBody(elem).children(".post_subject").text(),
          post_name: htmlBody(elem).children(".post_name").text()
          };        
          return pageData;
        }
        else {
          // console.log('[KangLOG] less : ');
        }
      }) // End map
    }) // End request
  }
}