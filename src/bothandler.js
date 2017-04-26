const config = require("./config");
const TelegramBot = require('node-telegram-bot-api');
const { Record } = require('immutable');

exports.BotHandler = class BotHandler {
  constructor(dashboard, ini) {
    this._bot = new TelegramBot(config.token, { polling: true });
    this._msgType = "message";
    this._replyOpts = {
      reply_to_message_id: 0,
      reply_markup: {
        resize_keyboard: true,
        one_time_keyboard: true,
        remove_keyboard: true,
        // keyboard: [["uno :+1:"],["uno \ud83d\udc4d", "due"],["uno", "due","tre"],["uno", "due","tre","quattro"]]
      }
    };

    this._help = "/help : 이 설명을 보여줌.\n\n" +
    "/filter <filter name> : 게시판에서 해당. <filter name> 이 들어가는 글만 알림\n\n" +
    "/dashboard <park | jirum> : 해당 게시판으로 이동. (park-모두의 공원, jirum-알구게)\n\n" +
    "/resetfilter : 저장한 필터를 초기화합니다.";

    this._cmds = "/dashboard park 또는 jirum을 입력해주세요.";

    this._dashboard = dashboard;

    this._ini = ini;
  }

  get msgType() {
    return this._msgType;
  }

  set msgType(msgType) {
    this._msgType = msgType;
  }
/*
* @return (true or false): If the received text is one of command, 
* then returns true. Otherwise, returns false.
*/
  _commandFilter(msg) {
    const chatId = msg.chat.id;
    const arr = msg.text.split(" ");
    switch (arr[0]) {
      case '/help':
      this._bot.sendMessage(chatId, this._help);
        return true;

      case '/resetfilter':
        delete this._ini.filePointer.filterlist;
        return true;

      case '/filter':
        if (arr.length < 2){
          return false;
        }

        var filterList = "";
        for(var i = 1; i < arr.length; i++){
           filterList += arr[i];
           filterList += ",";
        }
        this._ini.filePointer.filterlist = filterList;
        this._ini.writeConfigToFile(this._ini.filePointer);
        return true;

      case '/dashboard':
        if (arr.length < 2){
          return false;
        }

        if (arr[1] == "park" || arr[1] == "jirum"){
          this._dashboard.url = arr[1];
        }
        else {
          var opts = Object.assign({}, this._replyOpts);
          opts['reply_to_message_id'] = msg.message_id;
          this._bot.sendMessage(chatId, this._cmds, opts);
        }
        return true;

      default:
        return false;
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