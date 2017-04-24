const request = require("tinyreq");
const cheerio = require("cheerio");

request("http://www.clien.net/cs2/bbs/board.php?bo_table=jirum", function (err, body) {
  let htmlBody = cheerio.load(err || body);
  // console.log(htmlBody("td.post_subject"));
  let articles = htmlBody("tr.mytr");  
  
  articles.each((i, elem) => {
    var pageData = {};
    pageData["id"] = htmlBody(elem).children().html();
    pageData["post_category"] = htmlBody(elem).children(".post_category").text();
    pageData["post_subject"] = htmlBody(elem).children(".post_subject").text();
    pageData["post_name"] = htmlBody(elem).children(".post_name").text();

    console.log('[KangLOG] pageData : ' + JSON.stringify(pageData));
  })
});