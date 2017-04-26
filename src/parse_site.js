/*
* Author : Youngki
* Email : yellowgg2@gmail.com
*/
const request = require("tinyreq");
const cheerio = require("cheerio");
const config = require("./config");

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

  set url(url) {
    this._url = url;
  }

  get url(){
    return this._url;
  }

  getJsonFromBody() {
    var articles;
    var finalData;

    request(config.dashboard[this._url], (err, body) => { // Begin request
      let htmlBody = cheerio.load(err || body);
      let lastIdOfEachDashboard = NaN;

      if (this._url == "park") {
        lastIdOfEachDashboard = parseInt(this._ini.filePointer.parklastid, 10);
      }
      else if (this._url == "jirum") {
        lastIdOfEachDashboard = parseInt(this._ini.filePointer.jirumlastid, 10);
      }
      else { }

      articles = htmlBody(this._tag);     

      this._articles = articles.map((i, elem) => { // Begin map
        let articleId = htmlBody(elem).children().html();
        let tempId = 0;
        let idNeedToBeSaved = 0;

        if (isNaN(lastIdOfEachDashboard) == false) {
          tempId = lastIdOfEachDashboard;
        }

        if (articleId > tempId) {
          if (i == 0) { // Save only the latest post ID.
            if (this._url == "park") {
              this._ini.filePointer.parklastid = articleId;
            }
            else if (this._url == "jirum") {
              this._ini.filePointer.jirumlastid = articleId;
            }
            else { }
            this._ini.writeConfigToFile(this._ini.filePointer);
          }

          var pageData = {
            id: htmlBody(elem).children().html(),
            post_category: htmlBody(elem).children(".post_category").text(),
            post_subject: htmlBody(elem).children(".post_subject").text(),
            post_name: htmlBody(elem).children(".post_name").text(),
            image: htmlBody(htmlBody(elem).children(".post_name").html()).attr("src"),
          };
          
          if (this._ini.filePointer.filterlist == undefined || this._ini.filePointer.filterlist == "") {
            // console.log('[KangLOG] NO FILTER : ' + JSON.stringify(pageData));
            return pageData;            
          }
          else {
            var filterList = new RegExp(this._ini.filePointer.filterlist);
            if (pageData["post_subject"].search(filterList) != -1) {
              // console.log('[KangLOG] pageData : ' + JSON.stringify(pageData));
              return pageData;
            }
          }
        }
      }) // End map
    }) // End request
  }
}