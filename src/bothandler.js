/*
* Author : Youngki
* Email : yellowgg2@gmail.com
*/
const config = require(__base + "src/config");
const TelegramBot = require('node-telegram-bot-api');
const userinfo = require(__base + "src/userinfo");

exports.BotHandler = class BotHandler {
  constructor(userInfo = new userinfo.UserInfo(), 
              bot = new TelegramBot(config.token, { polling: true })) {    
    this._bot = bot;
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
      "/showconfig : 현재 설정을 보여줍니다.\n\n" +
      "/resetfilter : 저장한 필터를 초기화합니다.";

    this._cmds = `<${config.listOfDashBoard}>중 하나를 입력해주세요.`;
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
    let readData = {};
    const chatId = msg.chat.id;
    const arr = msg.text.split(" ");
    switch (arr[0]) {
      case '/start':
        readData = this._userInfo.readUserInfo(chatId);
        if (readData == undefined) {
          let userInitInfo = {
            filterlist: "",
            dashboardurl: config.listOfDashBoard[0], // jirum
          };
          this._userInfo.writeUserInfo(chatId, userInitInfo);
        }

        return true;

      case '/help':
        this._bot.sendMessage(chatId, this._help);
        return true;

      case '/resetfilter':
        readData = this._userInfo.readUserInfo(chatId);
        readData["filterlist"] = "";
        this._userInfo.writeUserInfo(chatId, readData);        
        return true;

      case '/showconfig':
        return true;

      case '/filter':
        if (arr.length < 2) {
          return false;
        }

        let filterList = "";
        for (var i = 1; i < arr.length; i++) {
          filterList += arr[i];
          if (i != arr.length - 1) {
            filterList += "|";
          }
        }

        readData = this._userInfo.readUserInfo(chatId);
        readData["filterlist"] = filterList;
        this._userInfo.writeUserInfo(chatId, readData);
        return true;

      case '/dashboard':
        if (arr.length < 2) {
          return false;
        }
        
        let idx = config.listOfDashBoard.indexOf(arr[1]);

        if (idx != -1) {
          readData = this._userInfo.readUserInfo(chatId);
          readData["dashboardurl"] = arr[1];
          this._userInfo.writeUserInfo(chatId, readData);
        }
        else {
          let opts = Object.assign({}, this._replyOpts);
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
        this.sendCurrentInfo(msg.chat.id);
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
      let text = `${config.dashboard[userInfo["dashboardurl"]]}&wr_id=${pageData["id"]}`;
      this._bot.sendMessage(key, text);
    }
  }

  sendCurrentInfo(chatId) {
    let obj = this._userInfo.readUserInfo(chatId);
    let localconf = JSON.stringify(obj);
    this._bot.sendMessage(chatId, localconf);
  }
}