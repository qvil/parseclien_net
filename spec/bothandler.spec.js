global.__base = __dirname + '/';

const bothandler = require(__base + "src/bothandler");
const config = require(__base + "src/config");

describe("Telegram Bot Test", function () {
  it("_commandFilter Test", function (done) {
    const bot = new bothandler.BotHandler();
    const cmds = ["/start", "/help", "/resetfilter", "/showconfig", "/filter", "/dashboard", "asdflkjlasd",];
    let msg = {
      chat: {
        id: 1111
      },
      text: "",
      message_id: 121212
    };

    for(var i = 0; i < cmds.length; i++){
      msg.text = cmds[i];
      bot._commandFilter(msg);
    }
    done();
  });
});