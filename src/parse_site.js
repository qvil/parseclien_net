/*
* Author : Youngki
* Email : yellowgg2@gmail.com
*/
const request = require("tinyreq");
const cheerio = require("cheerio");
const config = require(__base + "src/config");

exports.ParseClien = class ParseClien {
  constructor(bot, userInfo) {
    this._bot = bot;
    this._tag = "tr.mytr";
    this._userInfo = userInfo;
  }

  getJsonFromBody() {
    let articles;
    let finalData;

    for (var i = 0; i < config.listOfDashBoard.length; i++) {
      let url = config.listOfDashBoard[i];
      
      request(config.dashboard[url], (err, body) => { // Begin request
        let htmlBody = cheerio.load(err || body);
        let lastIdOfEachDashboard = NaN;
        let lastId = this._userInfo.readCommonInfo();

        lastIdOfEachDashboard = lastId[url];

        articles = htmlBody(this._tag);

        articles.map((i, elem) => { // Begin Loop
          let articleId = htmlBody(elem).children().html();
          let tempId = 0;
          let idNeedToBeSaved = 0;
          tempId = lastIdOfEachDashboard;

          if (articleId > tempId) {
            if (i == 0) { // Save only the latest post ID.
              lastId[url] = articleId;
              this._userInfo.writeUserInfo("common", lastId);
            }

            let pageData = {
              id: htmlBody(elem).children().html(),
              post_category: htmlBody(elem).children(".post_category").text(),
              post_subject: htmlBody(elem).children(".post_subject").text(),
              post_name: htmlBody(elem).children(".post_name").text(),
              image: htmlBody(htmlBody(elem).children(".post_name").html()).attr("src"),
            };

            let userInfoList = this._userInfo.readUserInfo(undefined);
            console.log('[KangLOG] NO FILTER : ' + url + " ## " + JSON.stringify(pageData));
            for (var k in userInfoList) { // send messages to all users
              if (userInfoList.hasOwnProperty(k)) {
                if (userInfoList[k]["dashboardurl"] != url){
                  continue;
                }
                if (userInfoList[k]["filterlist"] == undefined || userInfoList[k]["filterlist"] == "") {
                  // console.log('[KangLOG] NO FILTER : ' + JSON.stringify(userInfoList));                  
                  this._bot.sendMessageFromObj(k, userInfoList[k], pageData);
                }
                else {
                  let filterList = new RegExp(userInfoList[k]["filterlist"]);
                  if (pageData["post_subject"].search(filterList) != -1) {
                    // console.log('[KangLOG] pageData : ' + JSON.stringify(pageData));
                    this._bot.sendMessageFromObj(k, pageData);
                  }
                } // End if
              }
            }
          }
        }) // End Loop
      }) // End request
    } // End for loop
  }  // End of function
}