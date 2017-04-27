/*
* Author : Youngki
* Email : yellowgg2@gmail.com
*/
global.__base = __dirname + '/';

const clien = require("./src/parse_site");
const config = require("./src/config");
const bothandler = require("./src/bothandler");
const userinfo = require("./src/userinfo");

const uinfo = new userinfo.UserInfo();

const bot = new bothandler.BotHandler(uinfo);
const startParse = new clien.ParseClien(bot, uinfo);

// console.log('[KangLOG]  : ' + config.listOfDashBoard);

var infiniteLoop = () => {
  startParse.getJsonFromBody();
  getClienData();
}

function getClienData() {
  setTimeout(infiniteLoop, 30000)
}
console.log('Initialize clien bot.....');
bot.listenEvent();
console.log('Start getting Clien data at every 30 sec....');
getClienData();