const clien = require("./src/parse_site");
const config = require("./src/config");
const bothandler = require("./src/bothandler");
const ini = require("./src/rwinifile");

const iniAccess = new ini.ReadWriteIni();

const startParse = new clien.ParseClien(config.park, iniAccess);
const bot = new bothandler.BotHandler(startParse);

var infiniteLoop = () => {
  startParse.getJsonFromBody();

  if (startParse.articles != undefined) {
    console.log('[KangLOG] pageData : ' + JSON.stringify(startParse.articles.get()));    
    console.log("=====================================" + startParse._url);
  }
  else { // No article has been scrapped.
    console.log('[KangLOG] undefined : ');
  }
  getClienData();
}

function getClienData() {
  setTimeout(infiniteLoop, 3000)
}

bot.listenEvent();
getClienData();