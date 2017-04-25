const clien = require("./src/parse_site");
const config = require("./src/config");
const TelegramBot = require('node-telegram-bot-api');

const bot = new TelegramBot(config.token, {polling: true});
const startParse = new clien.ParseClien(config.park);

bot.on('message', (msg) => {
  const chatId = msg.chat.id;
  const opts = {
        reply_to_message_id: msg.message_id,
        reply_markup: {
            resize_keyboard: true,
            one_time_keyboard: true,
            remove_keyboard: true,
            // keyboard: [["uno :+1:"],["uno \ud83d\udc4d", "due"],["uno", "due","tre"],["uno", "due","tre","quattro"]]
        }
    };

  // send back the matched "whatever" to the chat
  bot.sendMessage(chatId, msg.text, opts);
});

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

getClienData();