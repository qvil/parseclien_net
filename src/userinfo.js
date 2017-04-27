var jf = require('jsonfile');

exports.userinfo = class UserInfo{
  constructor(jsonFile = "./config.ini"){
    this._jsonFile = jsonFile;
    // jsonfile.readFileSync(file);
  }

  readUserInfo(userId){
    var obj = jf.readFileSync(this._jsonFile);

    if (userId == undefined){
      return obj;
    }    
    return obj[userId];
  }

  readCommonInfo(){
    var readData = jf.readFileSync(this._jsonFile);

    if (readData["common"] == undefined){
      var commonObj = {
        park: 0,
        jirum: 0,
        iphone: 0,
        nas: 0,
      };

      readData["common"] = commonObj;
      jsonfile.writeFileSync(this._jsonFile, readData);
      return commonObj;
    }
    return readData["common"];
  }

  writeUserInfo(userId, obj){
    var readData = jf.readFileSync(this._jsonFile);
    readData[userId] = obj;
    jsonfile.writeFileSync(this._jsonFile, readData);
  }

  getRegisteredChatIDs(){
    var readData = jf.readFileSync(this._jsonFile);
    var keyArray = Object.keys(readData);

    return keyArray.filter((chatId) => chatId != "common");
  }
}