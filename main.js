/*
* Author : Youngki
* Email : yellowgg2@gmail.com
*/
const clien = require("./src/parse_site");
const config = require("./src/config");
const bothandler = require("./src/bothandler");
const userinfo = require("./src/userinf");
const bot = new bothandler.BotHandler(userinfo);
const startParse = new clien.ParseClien(bot, userinfo);

var infiniteLoop = () => {
  startParse.getJsonFromBody();

  if (startParse.articles != undefined) {
    bot.sendMessageFromObj(startParse.articles.get());
  }
  else { // No article has been scrapped.
  }
  getClienData();
}

function getClienData() {
  setTimeout(infiniteLoop, 30000)
}
console.log('Initialize clien bot.....');
bot.listenEvent();
console.log('Start getting Clien data at every 30 sec....');
getClienData();