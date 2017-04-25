const clien = require("./src/parse_site");
const config = require("./src/config");
const bothandler = require("./src/bothandler");

const startParse = new clien.ParseClien(config.park);
const bot = new bothandler.BotHandler();

var infiniteLoop = () => {
  startParse.getJsonFromBody();

  if (startParse.articles != undefined) {
    console.log('[KangLOG] pageData : ' + JSON.stringify(startParse.articles.get()));    
    console.log("=====================================");
  }
  else {
    console.log('[KangLOG] undefined : ');
  }
  getClienData();  
}

function getClienData() {
  setTimeout(infiniteLoop, 3000)
}

bot.listenEvent();
getClienData();