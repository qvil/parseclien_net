global.__base = __dirname + '/../';

const userinfo = require(__base + "src/userinfo");
const config = require(__base + "src/config");
const fs = require('fs');

let data = {
  "1111": { "filterlist": "", "dashboardurl": "jirum" },
  "2222": { "filterlist": "", "dashboardurl": "jirum" },
  "common": { "jirum": "674923", "park": "55044322", "iphone": "3743359", "nas": "48120" }
};

describe("Telegram Bot Test", () => {
  it("readUserInfo function test", (done) => {
    const ui = new userinfo.UserInfo(__base + "spec/config.spec.json");

    expect(ui.readUserInfo("1111")).toEqual(data["1111"]);
    expect(ui.readUserInfo("2222")).toEqual(data["2222"]);
    expect(ui.readUserInfo("3333")).toBe(undefined);
    expect(ui.readUserInfo(1111)).toEqual(data["1111"]);
    expect(ui.readUserInfo("")).toEqual(undefined);
    done();
  });

  it("readUserInfo function test without file", (done) => {
    const ui = new userinfo.UserInfo(__base + "spec/config.spec.without.file.json");

    expect(ui.readUserInfo("1111")).toBe(undefined);
    expect(ui.readUserInfo("2222")).toBe(undefined);
    expect(ui.readUserInfo("3333")).toBe(undefined);
    expect(ui.readUserInfo(1111)).toBe(undefined);
    expect(ui.readUserInfo("")).toBe(undefined);
    done();
  });

  it("readCommonInfo function test", (done) => {
    const ui = new userinfo.UserInfo(__base + "spec/config.spec.json");

    expect(ui.readCommonInfo()).toEqual(data["common"]);
    done();
  });

  it("readCommonInfo function test without file", (done) => {
    const ui = new userinfo.UserInfo(__base + "spec/config.spec.without.file.json");

    expect(ui.readCommonInfo()).toEqual(config.commonObj);
    fs.unlink(__base + "spec/config.spec.without.file.json");
    done();
  })
});