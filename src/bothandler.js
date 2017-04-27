/*
* Author : Youngki
* Email : yellowgg2@gmail.com
*/
const config = require("./config");
const TelegramBot = require('node-telegram-bot-api');
const { Record } = require('immutable');

exports.BotHandler = class BotHandler {
  constructor(userInfo) {
    this._defaulturl = config.listOfDashBoard[0];
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
      "/filter <filter name> : 게시판에서 <filter name> 이 들어가는 글만 알림.\n" +
      "띄어쓰기를 사용하여 여러개의 필터를 걸 수 있음.\n(ex. /filter 문재인 대통령)" +
      "이렇게 검색하면 문재인과 대통령이 들어간 게시글은 모두 알려줌.\n\n" +
      `/dashboard <${config.listOfDashBoard}> : 해당 게시판으로 이동. (park-모두의 공원, jirum-알구게)\n\n` +
      "/config : 현재 설정을 보여줍니다.\n\n" +
      "/resetfilter : 저장한 필터를 초기화합니다.";

    this._cmds = "/dashboard park 또는 jirum을 입력해주세요.";
    this._userInfo = userInfo;
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
      case '/start':
        var obj = this._userInfo.readUserInfo(chatId);
        if (obj == undefined) {
          var userInitInfo = {
            filterlist: "",
            dashboardurl: this._defaulturl, // jirum
          };
          this._userInfo.writeUserInfo(chatId, userInitInfo);
        }

        return true;

      case '/help':
        this._bot.sendMessage(chatId, this._help);
        return true;

      case '/resetfilter':
        var obj = this._userInfo.readUserInfo(chatId);
        obj["filterlist"] = "";
        this.userInfo.writeUserInfo(chatId, obj);
        return true;

      case '/config':
        var obj = this._userInfo.readUserInfo(chatId);
        var config = JSON.stringify(obj);
        this._bot.sendMessage(chatId, config);
        return true;

      case '/filter':
        if (arr.length < 2) {
          return false;
        }

        var filterList = "";
        for (var i = 1; i < arr.length; i++) {
          filterList += arr[i];
          if (i != arr.length - 1) {
            filterList += "|";
          }
        }

        var obj = this._userInfo.readUserInfo(chatId);
        obj["filterlist"] = filterList;
        this.userInfo.writeUserInfo(chatId, obj);
        return true;

      case '/dashboard':
        if (arr.length < 2) {
          return false;
        }

        var idx = config.dashboard.indexOf(arr[1]);
        
        if (idx != -1) {
          var readData = this._userInfo.readUserInfo(chatId);
          console.log('[KangLOG]  : ' + JSON.stringify(readData));
          readData["dashboardurl"] = arr[1];
          this._userInfo.writeUserInfo(chatId, readData);
        }
        else {
          var opts = Object.assign({}, this._replyOpts);
          opts['reply_to_message_id'] = msg.message_id;
          this._bot.sendMessage(chatId, this._cmds, opts);
        }
        return true;

      default:
        this._bot.sendMessage(chatId, this._help);
        return true;
    }
    return false;
  }

  listenEvent() {
    this._bot.on(this._msgType, (msg) => {
      if (this._commandFilter(msg) == true) {
        return;
      }
      // this._chatId = msg.chat.id;
      // console.log('[KangLOG] this._chatId : ' + this._chatId);
      // this._bot.sendMessage(chatId, msg.text, opts); // To reply to a specific user
      // this._bot.sendMessage(this._chatId, msg.text);
    });
  }

  // key : chatid
  // pageData : article info
  sendMessageFromObj(key, userInfo, pageData) {
    if (key != "common") {
      var text = `${config.dashboard[userInfo["dashboardurl"]]}&wr_id=${pageData["id"]}`;
      this._bot.sendMessage(key, text);
    }
  }
}