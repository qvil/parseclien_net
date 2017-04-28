global.__base = __dirname + '/../';

const userinfo = require(__base + "src/userinfo");
const config = require(__base + "src/config");
const bothandler = require(__base + "src/bothandler");
const fs = require('fs');

class DummyTelegramBot{
  constructor(){}
  sendMessage(chatId, text){}
}

let data = {
  "1111": { "filterlist": "", "dashboardurl": "jirum" },
  "2222": { "filterlist": "", "dashboardurl": "jirum" },
  "common": { "jirum": "674923", "park": "55044322", "iphone": "3743359", "nas": "48120" }
};

describe("BotHandler Class test", () => {
  it("_commandFilter function test", () => {
    const ui = new userinfo.UserInfo(__base + "spec/config.spec.json");
    const bot = new bothandler.BotHandler(ui, new DummyTelegramBot());    

    let msg = {
      chat: {
        id: "1111",
      },
      text: "aaaa",
    };

    expect(bot._commandFilter(msg)).toBe(true);    
  });  
});