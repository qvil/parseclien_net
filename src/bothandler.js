const config = require("./config");
const TelegramBot = require('node-telegram-bot-api');

exports.BotHandler = class BotHandler {
  constructor() {
    this._bot = new TelegramBot(config.token, { polling: true });
    this._msgType = "message";
    this._opts = {
      reply_to_message_id: 0,
      reply_markup: {
        resize_keyboard: true,
        one_time_keyboard: true,
        remove_keyboard: true,
        // keyboard: [["uno :+1:"],["uno \ud83d\udc4d", "due"],["uno", "due","tre"],["uno", "due","tre","quattro"]]
      }
    };

    this._help = `help : 이 설명을 보여줌
    filter <filter name> : 게시판에서 해당 <filter name> 이 들어가는 글만 알림
    dashboard <park|jirum> : 해당 게시판으로 이동 (park-모두의 공원, jirum-알구게)`
  }

  get msgType() {
    return this._msgType;
  }

  set msgType(msgType) {
    this._msgType = msgType;
  }

  _commandFilter(msg) {
    const chatId = msg.chat.id;
    switch (msg.text) {
      case 'help':
      this._bot.sendMessage(chatId, this._help);
        return true;
      case 'filter':
        return true;
      case 'dashboard':
        return true;
    }
    return false;
  }

  listenEvent() {    
    this._bot.on(this._msgType, (msg) => {
      if (this._commandFilter(msg) == true) {
        return;
      }
      const chatId = msg.chat.id;
      // this._bot.sendMessage(chatId, msg.text, opts);
      this._bot.sendMessage(chatId, msg.text);
    });
  }
}