const request = require("tinyreq");
const cheerio = require("cheerio");

exports.ParseClien = class ParseClien {
  constructor(url, ini) {
    this._url = url;
    this._tag = "tr.mytr";
    this._articles = null;
    this._ini = ini;
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
        let tempId = 0;
        let idNeedToBeSaved = 0;

        if (this._ini.filePointer.lastid != undefined){
          tempId = this._ini.filePointer.lastid;         
        }

        if (articleId > tempId){
          if (i == 0){ // Save only the latest post ID.
            this._ini.filePointer.lastid = articleId;
            this._ini.writeConfigToFile(this._ini.filePointer);
            console.log('[KangLOG] articleId : ' + articleId);
          }

          var pageData = {
            id: htmlBody(elem).children().html(),
            post_category: htmlBody(elem).children(".post_category").text(),
            post_subject: htmlBody(elem).children(".post_subject").text(),
            post_name: htmlBody(elem).children(".post_name").text()
          };
          return pageData;
        }        
      }) // End map
    }) // End request
  }
}