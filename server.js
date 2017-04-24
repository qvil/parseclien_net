const request = require("tinyreq");
const cheerio = require("cheerio");

request("http://www.clien.net/cs2/bbs/board.php?bo_table=jirum", function (err, body) {
  let htmlBody = cheerio.load(err || body);
  // console.log(htmlBody("td.post_subject"));
  let articles = htmlBody("tr.mytr");
  var pageData = {};
  
  articles.each((i, elem) => {
    console.log(htmlBody(elem).children(".post_subject").text());
    // return false;
  })
});